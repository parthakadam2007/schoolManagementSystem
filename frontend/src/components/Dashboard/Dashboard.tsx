import React from 'react';
import { Users, GraduationCap, BookOpen, TrendingUp, Award, Clock, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Teachers',
      value: '87',
      change: '+3%',
      icon: GraduationCap,
      color: 'bg-green-500'
    },
    {
      title: 'Active Classes',
      value: '42',
      change: '+8%',
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      title: 'Average GPA',
      value: '3.7',
      change: '+0.2',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    { action: 'New student Emma Johnson enrolled', time: '2 minutes ago', type: 'success' },
    { action: 'Teacher Dr. Smith updated class schedule', time: '5 minutes ago', type: 'info' },
    { action: 'Performance report generated', time: '1 hour ago', type: 'info' },
    { action: 'System maintenance scheduled', time: '2 hours ago', type: 'warning' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Performance chart would go here</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-1 rounded-full ${
                  activity.type === 'success' ? 'bg-green-100' :
                  activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-left">
            <Users className="h-6 w-6 mb-2" />
            <p className="font-medium">Add New Student</p>
            <p className="text-sm text-indigo-600">Create a new student profile</p>
          </button>
          <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-left">
            <GraduationCap className="h-6 w-6 mb-2" />
            <p className="font-medium">Add New Teacher</p>
            <p className="text-sm text-green-600">Register a new teacher</p>
          </button>
          <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-left">
            <BookOpen className="h-6 w-6 mb-2" />
            <p className="font-medium">Create Class</p>
            <p className="text-sm text-purple-600">Set up a new class</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;