// src/constants/menuItems.js

import {
  DASHBOARD_ROUTE,
  CLIENTS_ROUTE,
  PRODUCTS_ROUTE,
  INVOICES_ROUTE,
  EXPENSES_ROUTE,
  PURCHASE_ROUTE,
  STOCK_ROUTE,
  SUPPLIERS_ROUTE,
  REPORTS_ROUTE,
  RETURNS_ROUTE,
  TRASH_ROUTE,
  AI_ASSISTANT_ROUTE,
  SETTINGS_ROUTE,
} from './routes';

export const MENU_ITEMS = [
  {
    id: 'dashboard',
    icon: 'fa-home',
    label: 'Dashboard',
    route: DASHBOARD_ROUTE,
  },
  {
    id: 'clients',
    icon: 'fa-users',
    label: 'Customers',
    route: CLIENTS_ROUTE,
  },
  {
    id: 'products',
    icon: 'fa-box',
    label: 'Products',
    route: PRODUCTS_ROUTE,
  },
  {
    id: 'invoices',
    icon: 'fa-receipt',
    label: 'Sales',
    route: INVOICES_ROUTE,
  },
  {
    id: 'expenses',
    icon: 'fa-money-bill-wave',
    label: 'Expenses',
    route: EXPENSES_ROUTE,
  },
  {
    id: 'purchase',
    icon: 'fa-tags',
    label: 'Purchase',
    route: PURCHASE_ROUTE,
  },
  {
    id: 'stock',
    icon: 'fa-warehouse',
    label: 'Stock / Inventory',
    route: STOCK_ROUTE,
  },
  {
    id: 'suppliers',
    icon: 'fa-truck',
    label: 'Suppliers',
    route: SUPPLIERS_ROUTE,
  },
  {
    id: 'reports',
    icon: 'fa-chart-bar',
    label: 'Reports',
    route: REPORTS_ROUTE,
  },
  {
    id: 'returns',
    icon: 'fa-undo-alt',
    label: 'Returns',
    route: RETURNS_ROUTE,
  },
  {
    id: 'trash',
    icon: 'fa-trash-arrow-up',
    label: 'Trash Recover',
    route: TRASH_ROUTE,
  },
  {
    id: 'ai-assistant',
    icon: 'fa-robot',
    label: 'AI Assistant',
    route: AI_ASSISTANT_ROUTE,
  },
  {
    id: 'settings',
    icon: 'fa-cog',
    label: 'Settings',
    route: SETTINGS_ROUTE,
  },
];

// Group menu items by category (optional)
export const MENU_GROUPS = {
  main: ['dashboard'],
  sales: ['clients', 'invoices', 'products'],
  finance: ['expenses', 'purchase'],
  inventory: ['stock', 'suppliers'],
  tools: ['reports', 'returns', 'trash', 'ai-assistant'],
  settings: ['settings'],
};
