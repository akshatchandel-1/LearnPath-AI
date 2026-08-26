import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { mockCourses } from '../../utils/mockData';
import { BookOpen, Star, Clock, PlayCircle, BookmarkPlus } from 'lucide-react';

/**
 * Member 3: Courses List Placeholder Component
 * Location: src/components/courses/CoursesList.jsx
 */
export default function CoursesList() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <Card key={course.id} variant="interactive" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="primary" size="sm">{course.category}</Badge>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mb-2 line-clamp-2">
                {course.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {course.platform}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {course.duration}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              {course.enrolled ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Progress</span>
                    <span className="text-primary-300 font-semibold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <Button variant="primary" size="sm" className="w-full mt-2" icon={PlayCircle}>
                    Continue Lesson
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full" icon={BookmarkPlus}>
                  Enroll in Course
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
