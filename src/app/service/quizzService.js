import ApiService from '../apiservice';

export default class QuizzService extends ApiService {
  constructor() {
    super('/api/quizz');
  }

  search(quizzFilter) {
    let params = `?`;

    if (quizzFilter.courseClassId) {
      params = `${params}&courseClassId=${quizzFilter.courseClassId}`;
    }

    if (quizzFilter.code) {
      params = `${params}&code=${quizzFilter.code}`;
    }

    if (quizzFilter.tittle) {
      params = `${params}&tittle=${quizzFilter.tittle}`;
    }

    return this.get(params);
  }

  deleteQuizz(id) {
    return this.delete(`/${id}`);
  }

  save(quizz) {
    return this.post('/save', quizz);
  }

  getById(id) {
    return this.get(`/getQuizz/${id}`);
  }
}
