import { NotFoundException } from '@nestjs/common';

export class CoursesAdminNotFoundException extends NotFoundException {
  constructor() {
    super('coursesAdminNotFound');
  }
}
