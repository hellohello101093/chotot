import ApiClient from '../utils/ApiClient';
import superagent from 'superagent';

class CareerLink extends ApiClient {
    getData(url, page) {
      if (page) {
        console.log('Connecting to server...');
        return superagent.get(`http://www.sieuthivieclam.vn/Tim-viec.aspx?p=${page}`);
      } else {
        return superagent.get(`${url}`);
      }
    }
}
export default new CareerLink('http://careerbuilder.com');
