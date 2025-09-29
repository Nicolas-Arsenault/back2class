import React, { useState, useEffect } from "react";
import NotLoggedInHeader from "../../components/NotLoggedInHeader";
import AuthCard from "../../components/Auth/AuthCard";
import AuthButton from "../../components/Auth/AuthButton";
import EmailInput from "../../components/Auth/EmailInput";
import PasswordInput from "../../components/Auth/PasswordInput";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [showResend, setShowResend] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleLogin = async () => {
    setMessage("");
    setMessageType("error");
    setShowResend(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.warn("Could not parse JSON response", parseError);
        data = {};
      }

      if (response.ok) {
        setMessageType("success");
        setMessage("Login successful! Redirecting...");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        setMessageType("error");
        setMessage(data.message || `Login failed. (${response.status})`);

        if (data.message?.toLowerCase().includes("verify your email")) {
          setShowResend(true);
          startCooldown();
        }
      }
    } catch (error) {
      console.error("Network or fetch error:", error);
      setMessageType("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      setMessage(data.message);
      setMessageType(data.success ? "success" : "error");

      if (data.success) {
        startCooldown();
      }
    } catch {
      setMessageType("error");
      setMessage("Failed to resend verification email.");
    }
  };

  const startCooldown = () => {
    setCooldown(30);
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className="text-center bg-slate-100 min-h-screen">
      <NotLoggedInHeader />
      <h2 className="mt-10 font-bold text-2xl">Sign in to your account</h2>

      <AuthCard>
        <div className="flex flex-col">
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          <AuthButton onClick={handleLogin} text={"Sign in"} />
          <div className="justify-center flex flex-row">
            <a href="/forgot-password" className="text-blue-600 mt-5">Forgot password?</a>
          </div>

          {message && (
            <div className={`mt-5 text-sm mb-4 rounded p-2 ${
              messageType === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}>
              {message}
            </div>
          )}

          {showResend && (
            <p className="text-sm mt-2">
              Didn't receive the verification email?{" "}
              <span
                onClick={cooldown === 0 ? handleResend : null}
                className={`underline cursor-pointer ${
                  cooldown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Click here to resend {cooldown > 0 ? `(${cooldown}s)` : ''}
              </span>
            </p>
          )}
        </div>
      </AuthCard>

      <p className="mt-5">
        Not a member? <a href="/register" className="text-blue-600">Sign up here</a>
      </p>
    </div>
  );
};

export default LoginPage;
