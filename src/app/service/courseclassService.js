import ApiService from '../apiservice';

export default class CourseClassService extends ApiService {
  constructor() {
    super('/api/courseClass');
  }

  search(courseClassFilter) {
    let params = `?teacher=${courseClassFilter.teacher}`;

    if (courseClassFilter.courseUnit) {
      params = `${params}&courseUnit=${courseClassFilter.courseUnit}`;
    }

    if (courseClassFilter.name) {
      params = `${params}$name=${courseClassFilter.name}`;
    }

    return this.get(params);
  }

  deleteCourseClass(id) {
    return this.delete(`/${id}`);
  }

  save(courseClass) {
    return this.post('/save', courseClass);
  }
}
