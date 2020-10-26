import ApiService from '../apiservice';

class TeacherService extends ApiService {
  constructor() {
    super('/api/teacher');
  }

  authenticate(credentials) {
    return this.post('/login', credentials);
  }

  getCourseClassSizeForTeacher(id) {
    return this.get(`/${id}/classesLength`);
  }
}

export default TeacherService;
