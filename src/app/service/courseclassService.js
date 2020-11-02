import ApiService from '../apiservice';
import ValidationErro from '../exception/ValidationErro';

export default class CourseClassService extends ApiService {
  constructor() {
    super('/api/courseClass');
  }

  search(courseClassFilter) {
    let params = `?`;

    if (courseClassFilter.courseUnit) {
      params = `${params}&courseUnit=${courseClassFilter.courseUnit}`;
    }

    if (courseClassFilter.name) {
      params = `${params}&name=${courseClassFilter.name}`;
    }

    if (courseClassFilter.teacher) {
      params = `${params}&teacher=${courseClassFilter.teacher}`;
    }

    return this.get(params);
  }

  deleteCourseClass(id) {
    return this.delete(`/${id}`);
  }

  save(courseClass) {
    return this.post('/save', courseClass);
  }

  update(courseClass) {
    return this.put(`/update/${courseClass.id}`, courseClass);
  }

  getById(id) {
    return this.get(`/find/${id}`);
  }

  validate(courseClass) {
    const erros = [];

    if (!courseClass.name) {
      erros.push('O campo Nome deve ser Preenchido');
    }

    if (!courseClass.courseUnitCode) {
      erros.push('O campo Código do Curso deve ser Preenchido');
    }

    if (!courseClass.code) {
      erros.push('O campo Código deve ser Preenchido');
    }

    if (erros && erros.length > 0) {
      throw new ValidationErro(erros);
    }
  }
}
