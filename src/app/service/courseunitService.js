import ApiService from '../apiservice';
import ValidationErro from '../exception/ValidationErro';

export default class CourseUnitService extends ApiService {
  constructor() {
    super('/api/courseUnit');
  }

  search(courseUnitFilter) {
    let params = `?`;

    if (courseUnitFilter.teacherId) {
      params = `${params}&teacherId=${courseUnitFilter.teacherId}`;
    }

    if (courseUnitFilter.code) {
      params = `${params}&code=${courseUnitFilter.code}`;
    }

    if (courseUnitFilter.name) {
      params = `${params}&name=${courseUnitFilter.name}`;
    }

    return this.get(params);
  }

  save(courseUnit) {
    return this.post('/save', courseUnit);
  }

  update(courseUnit) {
    return this.put(`/update/${courseUnit.id}`, courseUnit);
  }

  getById(id) {
    return this.get(`/find/${id}`);
  }

  validate(courseUnit) {
    const erros = [];

    if (!courseUnit.name) {
      erros.push('O campo Nome deve ser Preenchido');
    }

    if (!courseUnit.code) {
      erros.push('O campo Código deve ser Preenchido');
    }

    if (erros && erros.length > 0) {
      throw new ValidationErro(erros);
    }
  }
}