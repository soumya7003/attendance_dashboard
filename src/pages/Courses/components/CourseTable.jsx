// src/pages/Courses/components/CourseTable.jsx
import React, { useState } from 'react';
import { Edit2, Trash2, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { TableSkeleton } from '../../../components/table/TableSkeleton';

export const CourseTable = ({ courses, onEdit, onDelete, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (loading) {
    return <TableSkeleton rows={5} columns={6} />;
  }

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'archived':
        return <Badge variant="warning">Archived</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getDayBadge = (day) => {
    const dayColors = {
      Monday: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      Tuesday: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      Wednesday: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      Thursday: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      Friday: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      Saturday: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      Sunday: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${dayColors[day] || 'bg-gray-100 text-gray-800'}`}>
        {day}
      </span>
    );
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">Course Code</th>
              <th scope="col" className="px-6 py-3">Course Name</th>
              <th scope="col" className="px-6 py-3">Instructor</th>
              <th scope="col" className="px-6 py-3">Schedule</th>
              <th scope="col" className="px-6 py-3">Enrolled</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course) => (
              <tr
                key={course.id}
                className="bg-white border-b hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {course.code}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white">{course.name}</div>
                  {course.department && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {course.department}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">{course.instructor || '—'}</td>
                <td className="px-6 py-4">
                  {course.schedule ? (
                    <div className="space-y-1">
                      <div>{getDayBadge(course.schedule.day)}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {course.schedule.time} • Room {course.schedule.room || 'TBA'}
                      </div>
                    </div>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {course.enrollmentCount || 0}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">students</span>
                </td>
                <td className="px-6 py-4">{getStatusBadge(course.status)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(course)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(course)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, courses.length)} of {courses.length} courses
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};