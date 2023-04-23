import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { extractRequestFromContext } from '@stokei/nestjs';

import { AppNotFoundException } from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAllCourseInstructorsService } from '@/services/course-instructors/find-all-course-instructors';
import { FindAllCourseStudentsService } from '@/services/course-students/find-all-course-students';
import { FindAllRolesService } from '@/services/roles/find-all-roles';

@Injectable()
export class CoursePermissionGuard implements CanActivate {
  constructor(
    private findAppByIdService: FindAppByIdService,
    private findAllRolesService: FindAllRolesService,
    private findAllCourseStudentsService: FindAllCourseStudentsService,
    private findAllCourseInstructorsService: FindAllCourseInstructorsService,
    private findAccountByIdService: FindAccountByIdService,
    private reflector: Reflector
  ) {}

  getRequest(context: ExecutionContext) {
    return extractRequestFromContext(context);
  }

  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    const graphqlContext = GqlExecutionContext.create(context);
    const graphqlArgs = graphqlContext.getArgs();
    const courseId =
      graphqlArgs?.id || graphqlArgs?.courseId || graphqlArgs?.course;
    const account = await this.findAccountByIdService.execute(
      request?.user?.id || ''
    );
    if (!account) {
      throw new UnauthorizedException();
    }
    const app = await this.findAppByIdService.execute(request?.app?.id || '');
    if (!app) {
      throw new AppNotFoundException();
    }
    const isAppOwner = account.id === app.parent;
    if (isAppOwner) {
      return true;
    }
    const accountRoles = await this.findAllRolesService.execute({
      where: {
        AND: {
          parent: {
            equals: account.id
          },
          app: {
            equals: app.id
          }
        }
      }
    });
    const isAppAdmin = accountRoles?.items?.some(
      (role) => role.name === 'ADMIN'
    );
    if (isAppAdmin) {
      return true;
    }
    const courseInstructors =
      await this.findAllCourseInstructorsService.execute({
        page: {
          limit: 1
        },
        where: {
          AND: {
            course: {
              equals: courseId
            },
            instructor: {
              equals: account.id
            }
          }
        }
      });
    const isCourseInstructor = courseInstructors?.totalCount > 0;
    if (isCourseInstructor) {
      return true;
    }
    const courseStudents = await this.findAllCourseStudentsService.execute({
      page: {
        limit: 1
      },
      where: {
        AND: {
          course: {
            equals: courseId
          },
          student: {
            equals: account.id
          }
        }
      }
    });
    const isCourseStudent = courseStudents?.totalCount > 0;
    if (!isCourseStudent) {
      throw new ForbiddenException();
    }

    return isCourseStudent;
  }
}
