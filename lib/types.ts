// Auth types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  username?: string;
  repeatedPass?: string;
}

// Message types
export interface Message {
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
}

// Form types
export interface FormState {
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success?: string;
} 