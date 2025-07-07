import React from 'react';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  BarChart3, 
  Settings,
  LogOut,
  School
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { id: 'students', label: 'Students', icon: Users },
        { id: 'teachers', label: 'Teachers', icon: GraduationCap },
        { id: 'classes', label: 'Classes', icon: BookOpen },
        { id: 'performance', label: 'Performance', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    } else if (user?.role === 'teacher') {
      return [
        ...baseItems,
        { id: 'students', label: 'My Students', icon: Users },
        { id: 'classes', label: 'My Classes', icon: BookOpen },
        { id: 'performance', label: 'Performance', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    } else {
      return [
        ...baseItems,
        { id: 'classes', label: 'My Classes', icon: BookOpen },
        { id: 'performance', label: 'My Performance', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }
  };

  const menuItems = getMenuItems();

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'admin': return 'Admin Dashboard';
      case 'teacher': return 'Teacher Portal';
      case 'student': return 'Student Portal';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white h-screen fixed left-0 top-0 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-indigo-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <School className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">EduAdmin</h1>
            <p className="text-indigo-200 text-sm">{getRoleTitle()}</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-indigo-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </span>
          </div>
          <div>
            <p className="font-medium text-white">{user?.name}</p>
            <p className="text-indigo-200 text-sm capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-indigo-700 ${
                    activeTab === item.id
                      ? 'bg-indigo-600 shadow-md border-l-4 border-indigo-300'
                      : 'text-indigo-200 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-indigo-700">
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-700 hover:text-white transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;