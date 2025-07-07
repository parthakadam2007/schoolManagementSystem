import React, { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Award, AlertCircle } from 'lucide-react';
import { Performance } from '../../types';
import { mockPerformance } from '../../data/mockData';

const PerformancePage: React.FC = () => {
  const [performance, setPerformance] = useState<Performance[]>(mockPerformance);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');

  const filteredPerformance = performance.filter(student => 
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterGrade === '' || student.grade === filterGrade)
  );

  const getPerformanceColor = (value: number, type: 'gpa' | 'attendance' | 'assignments') => {
    const thresholds = {
      gpa: { excellent: 3.5, good: 3.0, warning: 2.5 },
      attendance: { excellent: 90, good: 80, warning: 70 },
      assignments: { excellent: 90, good: 80, warning: 70 }
    };

    const threshold = thresholds[type];
    if (value >= threshold.excellent) return 'text-green-600';
    if (value >= threshold.good) return 'text-yellow-600';
    if (value >= threshold.warning) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceIcon = (value: number, type: 'gpa' | 'attendance' | 'assignments') => {
    const thresholds = {
      gpa: { excellent: 3.5, good: 3.0, warning: 2.5 },
      attendance: { excellent: 90, good: 80, warning: 70 },
      assignments: { excellent: 90, good: 80, warning: 70 }
    };

    const threshold = thresholds[type];
    if (value >= threshold.excellent) return <TrendingUp className="h-4 w-4" />;
    if (value >= threshold.good) return <Award className="h-4 w-4" />;
    if (value >= threshold.warning) return <TrendingDown className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const grades = ['9th', '10th', '11th', '12th'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Monitor</h2>
          <p className="text-gray-600">Track student academic performance and attendance</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average GPA</p>
              <p className="text-2xl font-bold text-gray-900">3.77</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
              <p className="text-2xl font-bold text-gray-900">95%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Assignments</p>
              <p className="text-2xl font-bold text-gray-900">89%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">At Risk</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Grades</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPerformance.map((student) => (
                <tr key={student.studentId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {student.studentName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.studentName}</div>
                        <div className="text-sm text-gray-500">ID: {student.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getPerformanceColor(student.gpa, 'gpa')}`}>
                        {student.gpa}
                      </span>
                      <span className={`ml-2 ${getPerformanceColor(student.gpa, 'gpa')}`}>
                        {getPerformanceIcon(student.gpa, 'gpa')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getPerformanceColor(student.attendance, 'attendance')}`}>
                        {student.attendance}%
                      </span>
                      <span className={`ml-2 ${getPerformanceColor(student.attendance, 'attendance')}`}>
                        {getPerformanceIcon(student.attendance, 'attendance')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getPerformanceColor(student.assignments, 'assignments')}`}>
                        {student.assignments}%
                      </span>
                      <span className={`ml-2 ${getPerformanceColor(student.assignments, 'assignments')}`}>
                        {getPerformanceIcon(student.assignments, 'assignments')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(student.lastActivity).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.gpa >= 3.5 && student.attendance >= 90 && student.assignments >= 90
                        ? 'bg-green-100 text-green-800'
                        : student.gpa >= 3.0 && student.attendance >= 80 && student.assignments >= 80
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.gpa >= 3.5 && student.attendance >= 90 && student.assignments >= 90
                        ? 'Excellent'
                        : student.gpa >= 3.0 && student.attendance >= 80 && student.assignments >= 80
                        ? 'Good'
                        : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;