import React from 'react';
import { Users, GraduationCap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoleSelection: React.FC = () => {
  const roles = [
    {
      type: 'student',
      title: 'Student',
      description: 'Access your courses, assignments, and track your academic progress',
      icon: Users,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600'
    },
    {
      type: 'teacher',
      title: 'Teacher',
      description: 'Manage your classes, students, and monitor academic performance',
      icon: GraduationCap,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      borderColor: 'border-green-200',
      textColor: 'text-green-600'
    },
    {
      type: 'admin',
      title: 'Administrator',
      description: 'Full system access to manage students, teachers, and school operations',
      icon: Shield,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-6">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to EduAdmin</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your role to access the appropriate dashboard and features designed for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.type}
                className={`bg-white rounded-2xl shadow-lg border-2 ${role.borderColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${role.color} rounded-xl mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">{role.description}</p>
                  
                  <div className="space-y-3">
                    <Link
                      to={`/signin/${role.type}`}
                      className={`w-full flex items-center justify-center px-6 py-3 ${role.color} ${role.hoverColor} text-white rounded-lg font-medium transition-colors duration-200 group`}
                    >
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link
                      to={`/signup/${role.type}`}
                      className={`w-full flex items-center justify-center px-6 py-3 border-2 border-gray-200 ${role.textColor} bg-white hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200`}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@eduadmin.com" className="text-indigo-600 hover:text-indigo-700 font-medium">
              support@eduadmin.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;