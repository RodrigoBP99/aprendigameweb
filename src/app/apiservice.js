import axios from 'axios';
import config from './baseUrlData';

const httpClient = axios.create({
  baseURL: config.baseUrl,
});

class ApiService {
  constructor(apiurl) {
    this.apiurl = apiurl;
  }

  post(url, object) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient.post(requestUrl, object);
  }

  put(url, object) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient.put(requestUrl, object);
  }

  delete(url) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient.delete(requestUrl);
  }

  get(url) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient(requestUrl);
  }
}

export default ApiService;
