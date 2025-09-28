import React, {useState} from "react";
import NotLoggedInHeader from "../components/NotLoggedInHeader";
import AuthCard from "../components/AuthCard";
import AuthButton from "../components/AuthButton";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

const LoginPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

const handleLogin = async () => {
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
      data = {}; // fallback if response body is empty or invalid JSON
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
    }
  } catch (error) {
    console.error("Network or fetch error:", error);
    setMessageType("error");
    setMessage("Something went wrong. Please try again.");
  }
};




  return(
    <div className="text-center bg-slate-100 min-h-screen">
      <NotLoggedInHeader />
      <h2 className="mt-10 font-bold text-2xl">Sign in to your account</h2>

    <AuthCard>
        <div className="flex flex-col">
          <EmailInput value={email} onChange={(e)=>setEmail(e.target.value)}></EmailInput>
          <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}></PasswordInput>
          <AuthButton onClick={handleLogin} text={"Sign in"}></AuthButton>
          <div className="justify-center flex flex-row">
              <a href="/forgot-password" className=" text-blue-600 mt-5">Forgot password?</a>
          </div>
          {message && (
          <div
            className={`mt-5 text-sm mb-4 rounded p-2 ${
              messageType === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        </div>
      </AuthCard>
      <p className="mt-5">Not a member? <a href="/register" className="text-blue-600">Sign up here</a></p>
    </div>
  )
}

export default LoginPage;