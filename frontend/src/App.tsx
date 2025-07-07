import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import RoleSelection from './components/Auth/RoleSelection';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import Unauthorized from './components/Layout/Unauthorized';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import StudentsPage from './components/Students/StudentsPage';
import TeachersPage from './components/Teachers/TeachersPage';
import ClassesPage from './components/Classes/ClassesPage';
import PerformancePage from './components/Performance/PerformancePage';

const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  const getPageTitle = (tab: string) => {
    const titles = {
      dashboard: 'Dashboard',
      students: user?.role === 'admin' ? 'Students' : 'My Students',
      teachers: 'Teachers',
      classes: user?.role === 'admin' ? 'Classes' : 'My Classes',
      performance: user?.role === 'student' ? 'My Performance' : 'Performance Monitor',
      settings: 'Settings'
    };
    return titles[tab as keyof typeof titles] || 'Dashboard';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return (
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
            <StudentsPage />
          </ProtectedRoute>
        );
      case 'teachers':
        return (
          <ProtectedRoute allowedRoles={['admin']}>
            <TeachersPage />
          </ProtectedRoute>
        );
      case 'classes':
        return <ClassesPage />;
      case 'performance':
        return <PerformancePage />;
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-gray-600 mt-2">Settings page coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="ml-64">
        <Header title={getPageTitle(activeTab)} />
        <main className="min-h-screen bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RoleSelection />} />
      <Route path="/signin/:role" element={<SignIn />} />
      <Route path="/signup/:role" element={<SignUp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;