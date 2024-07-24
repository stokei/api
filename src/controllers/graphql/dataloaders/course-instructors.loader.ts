import { Injectable, Scope } from '@nestjs/common';
import { PaginationMapper } from '@stokei/nestjs';
import DataLoader from 'dataloader';

import { CourseInstructorModel } from '@/models/course-instructor.model';
import { FindAllCourseInstructorsService } from '@/services/course-instructors/find-all-course-instructors';

@Injectable({ scope: Scope.REQUEST })
export class CourseInstructorsLoader {
  constructor(
    private readonly courseInstructorsService: FindAllCourseInstructorsService
  ) {}

  readonly findByIds = new DataLoader(async (courseInstructorIds: string[]) => {
    const courseInstructors = await this.courseInstructorsService.execute({
      where: {
        AND: {
          ids: courseInstructorIds
        }
      }
    });
    const courseInstructorsMap = new Map(
      courseInstructors?.items?.map((courseInstructor) => [
        courseInstructor.id,
        courseInstructor
      ])
    );
    return courseInstructorIds.map((courseInstructorId) =>
      courseInstructorsMap.get(courseInstructorId)
    );
  });

  readonly findByCourseIds = new DataLoader(
    async (courseInstructorCourseIds: string[]) => {
      const courseInstructors = await this.courseInstructorsService.execute({
        where: {
          AND: {
            course: {
              equals: courseInstructorCourseIds
            }
          }
        }
      });
      return courseInstructorCourseIds.map((courseId) => {
        const items = courseInstructors?.items?.filter(
          (courseInstructor) => courseInstructor.course === courseId
        );
        return new PaginationMapper<CourseInstructorModel>().toPaginationList({
          totalCount: items?.length || 0,
          items
        });
      });
    }
  );

  readonly findByInstructorIds = new DataLoader(
    async (courseInstructorInstructorIds: string[]) => {
      const courseInstructors = await this.courseInstructorsService.execute({
        where: {
          AND: {
            instructor: {
              equals: courseInstructorInstructorIds
            }
          }
        }
      });
      return courseInstructorInstructorIds.map((instructorId) => {
        const items = courseInstructors?.items?.filter(
          (courseInstructor) => courseInstructor.instructor === instructorId
        );
        return new PaginationMapper<CourseInstructorModel>().toPaginationList({
          totalCount: items?.length || 0,
          items
        });
      });
    }
  );
}
