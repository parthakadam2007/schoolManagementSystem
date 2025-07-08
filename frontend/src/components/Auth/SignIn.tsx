import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Users, GraduationCap, Shield, Eye, EyeOff, ArrowLeft, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SignIn: React.FC = () => {
  const { role } = useParams<{ role: 'student' | 'teacher' | 'admin' }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roleConfig = {
    student: {
      title: 'Student Portal',
      icon: Users,
      color: 'bg-blue-500',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-indigo-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      linkColor: 'text-blue-600 hover:text-blue-700'
    },
    teacher: {
      title: 'Teacher Dashboard',
      icon: GraduationCap,
      color: 'bg-green-500',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-emerald-50',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      linkColor: 'text-green-600 hover:text-green-700'
    },
    admin: {
      title: 'Admin Panel',
      icon: Shield,
      color: 'bg-purple-500',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-indigo-50',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      linkColor: 'text-purple-600 hover:text-purple-700'
    }
  };

  const config = roleConfig[role as keyof typeof roleConfig];
  const Icon = config?.icon || Users;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password, role as 'student' | 'teacher' | 'admin');
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!config) {
    return <div>Invalid role</div>;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.gradientFrom} via-white ${config.gradientTo} flex items-center justify-center p-4`}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to role selection
            </Link>
            
            <div className={`inline-flex items-center justify-center w-16 h-16 ${config.color} rounded-xl mb-4`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-600">{config.title}</p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className={`text-sm ${config.linkColor} font-medium`}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-4 py-3 ${config.buttonColor} text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to={`/signup/${role}`} className={`${config.linkColor} font-medium`}>
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;