import { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
// GlobalStyles import was previously commented-out which caused the component
// to be referenced but not defined at runtime. Restored the import below.
import GlobalStyles from '../components/dashboard/GlobalStyles';
import Overview from '../components/dashboard/tabs/Overview';
import Products from '../components/dashboard/tabs/Products';
import Clients from '../components/dashboard/tabs/Clients';
import Expenses from '../components/dashboard/tabs/Expenses';
// Purchase and PlaceholderTab imports were commented-out earlier which caused
// failed import resolution when those components were referenced. Restore
// the imports and provide the missing files.
import Purchase from '../components/dashboard/tabs/Purchase';
import PlaceholderTab from '../components/dashboard/tabs/PlaceholderTab';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: 'fa-home', label: 'Dashboard' },
    { id: 'clients', icon: 'fa-users', label: 'Customers' },
    { id: 'products', icon: 'fa-box', label: 'Products' },
    { id: 'invoices', icon: 'fa-receipt', label: 'Sales' },
    { id: 'expenses', icon: 'fa-money-bill-wave', label: 'Expenses' },
    { id: 'purchase', icon: 'fa-tags', label: 'Purchase' },
    { id: 'stock', icon: 'fa-warehouse', label: 'Stock / Inventory' },
    { id: 'suppliers', icon: 'fa-truck', label: 'Suppliers' },
    { id: 'reports', icon: 'fa-chart-bar', label: 'Reports' },
    { id: 'returns', icon: 'fa-undo-alt', label: 'Returns' },
    { id: 'trash', icon: 'fa-trash-arrow-up', label: 'Trash Recover' },
    { id: 'ai-assistant', icon: 'fa-robot', label: 'AI Assistant' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Overview />;
      case 'products':
        return <Products />;
      case 'clients':
        return <Clients />;
      case 'expenses':
        return <Expenses />;
      case 'purchase':
        return <Purchase />;
      default:
        return <PlaceholderTab menuItems={menuItems} activeTab={activeTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <GlobalStyles />

      <Sidebar
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          menuItems={menuItems}
          activeTab={activeTab}
          setSidebarOpen={setSidebarOpen}
        />

        {renderActiveTab()}
      </div>
    </div>
  );
}
