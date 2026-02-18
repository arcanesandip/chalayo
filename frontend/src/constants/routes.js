// src/constants/routes.js

// Public routes (no authentication required)
export const LANDING_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const ABOUT_ROUTE = '/about';
export const CONTACT_ROUTE = '/contact';

// Protected routes (authentication required)
export const DASHBOARD_ROUTE = '/dashboard';
export const PRODUCTS_ROUTE = '/dashboard/products';
export const CLIENTS_ROUTE = '/dashboard/clients';
export const INVOICES_ROUTE = '/dashboard/invoices';
export const EXPENSES_ROUTE = '/dashboard/expenses';
export const PURCHASE_ROUTE = '/dashboard/purchase';
export const STOCK_ROUTE = '/dashboard/stock';
export const SUPPLIERS_ROUTE = '/dashboard/suppliers';
export const REPORTS_ROUTE = '/dashboard/reports';
export const RETURNS_ROUTE = '/dashboard/returns';
export const TRASH_ROUTE = '/dashboard/trash';
export const AI_ASSISTANT_ROUTE = '/dashboard/ai-assistant';
export const SETTINGS_ROUTE = '/dashboard/settings';

// API routes
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const API_LOGIN = `${API_BASE_URL}/auth/login`;
export const API_REGISTER = `${API_BASE_URL}/auth/register`;
export const API_PRODUCTS = `${API_BASE_URL}/products`;
export const API_CLIENTS = `${API_BASE_URL}/clients`;
export const API_INVOICES = `${API_BASE_URL}/invoices`;
export const API_EXPENSES = `${API_BASE_URL}/expenses`;
