import superagent from 'superagent';

class DataCrawler {
  run(url) {
    return superagent.get(url);
  }
}
export default new DataCrawler();
