import { NotFoundException } from '@nestjs/common';

export class CoursesAdminsNotFoundException extends NotFoundException {
  constructor() {
    super('coursesAdminsNotFound');
  }
}
