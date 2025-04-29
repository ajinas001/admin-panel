'use client'

import { useState } from 'react';
import Dashboard from '@/components/sidebarComponents/Dashboard';
import Article from '@/components/sidebarComponents/Article';
import Layout from '@/components/Layout';
import AutoDealership from '@/components/sidebarComponents/Autodealership';
import Faqs from '@/components/sidebarComponents/Faqs';
import HelpCenterTable from '@/components/sidebarComponents/Helpcenter';
import Jobs from '@/components/sidebarComponents/Jobs';

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 
  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'article':
        return <Article />;
      case 'auto-dealership':
        return <AutoDealership />;
      case 'blog':
        return <Blog />;
        case 'faqs':
          return <Faqs />;
          case 'helpcenter':
            return <HelpCenterTable />;
            case 'jobs':
            return <Jobs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      setActiveComponent={setActiveComponent} 
      activeComponent={activeComponent}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    >
      {renderContent()}
    </Layout>
  );
}