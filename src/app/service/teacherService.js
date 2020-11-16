import ApiService from '../apiservice';
import ValidationErro from '../exception/ValidationErro';

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

  save(teacher) {
    return this.post('/register', teacher);
  }

  validate(teacher, passwordRepet) {
    const msgs = [];

    if (!teacher.name) {
      msgs.push('O campo nome é obrigatorio');
    }

    if (!teacher.registration) {
      msgs.push('O campo Matricula é obrigatorio');
    }

    if (!teacher.password || !passwordRepet) {
      msgs.push('Preencha os campos de senha');
    } else if (teacher.password !== passwordRepet) {
      msgs.push('As senhas devem ser iguais');
    }

    if (msgs && msgs.length > 0) {
      throw new ValidationErro(msgs);
    }
  }

  search(teacherFilter) {
    let params = `?`;

    if (teacherFilter.courseUnitId) {
      params = `${params}&courseUnitId=${teacherFilter.courseUnitId}`;
    }

    if (teacherFilter.registration) {
      params = `${params}&registration=${teacherFilter.registration}`;
    }

    if (teacherFilter.name) {
      params = `${params}&name=${teacherFilter.name}`;
    }

    return this.get(params);
  }
}

export default TeacherService;
