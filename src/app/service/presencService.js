import ApiService from '../apiservice';

class PresencService extends ApiService {
  constructor() {
    super('/api/presenc');
  }

  search(presencFilter) {
    let params = `?`;

    if (presencFilter.courseClassId) {
      params = `${params}&courseClassId=${presencFilter.courseClassId}`;
    }

    if (presencFilter.studentRegistration) {
      params = `${params}&studentRegistration=${presencFilter.studentRegistration}`;
    }

    if (presencFilter.code) {
      params = `${params}&code=${presencFilter.code}`;
    }

    return this.get(params);
  }

  deletePresenc(id) {
    return this.delete(`/${id}`);
  }
}

export default PresencService;
