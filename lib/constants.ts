// App constants
export const APP_NAME = 'Back2Class';
export const APP_DESCRIPTION = 'Votre plateforme d\'apprentissage moderne et intuitive';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  UPDATE_PASSWORD: '/update-password',
  VERIFIED: '/verified',
  DASHBOARD: '/home',
} as const;

// Public routes (don't require authentication)
export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.RESET_PASSWORD,
  ROUTES.UPDATE_PASSWORD,
  ROUTES.VERIFIED,
  '/auth/confirm',
] as const;

// Auth constants
export const AUTH = {
  EMAIL_UNIQUE_FUNCTION:'is_email_exist',
  MIN_PASSWORD_LENGTH: 6,
  VERIFICATION_REDIRECT_DELAY: 5000, // 5 seconds
  PASSWORD_UPDATE_REDIRECT_DELAY: 2000, // 2 seconds
} as const;

// UI constants
export const UI = {
  COUNTDOWN_DELAY: 1000, // 1 second
  TRANSITION_DURATION: 200, // 200ms
} as const;

// Messages
export const MESSAGES = {
  VERIFICATION_SUCCESS: 'Votre compte a été vérifié avec succès!',
  PASSWORD_UPDATE_SUCCESS: 'Mot de passe mis à jour avec succès!',
  EMAIL_SENT: 'Email de réinitialisation envoyé. Vérifiez votre boîte de réception.',
  PASSWORDS_DONT_MATCH: 'Les mots de passe ne correspondent pas.',
  INVALID_EMAIL: 'Veuillez entrer une adresse email valide.',
  PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 6 caractères.',
} as const;

// Route groups
export const ROUTE_GROUPS = {
  AUTH: '(auth)',
  DASHBOARD: '(dashboard)',
} as const; 