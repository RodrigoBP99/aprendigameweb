import ApiService from '../apiservice';

class StudentService extends ApiService {
  constructor() {
    super('/api/student');
  }

  search(studentFilter) {
    let params = `?`;

    if (studentFilter.courseUnitId) {
      params = `${params}&courseUnitId=${studentFilter.courseUnitId}`;
    }

    if (studentFilter.registration) {
      params = `${params}&registration=${studentFilter.registration}`;
    }

    if (studentFilter.name) {
      params = `${params}&name=${studentFilter.name}`;
    }

    if (studentFilter.courseClassId) {
      params = `${params}&courseClassId=${studentFilter.courseClassId}`;
    }

    return this.get(params);
  }
}

export default StudentService;
