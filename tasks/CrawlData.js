import ApiClient from '../utils/ApiClient';
import superagent from 'superagent';

class CrawlData extends ApiClient {
    getDataVietNameWork(page) {
      console.log('page', page);
      const url = '/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.22.1%3Binstantsearch.js%201.6.0%3BJS%20Helper%202.20.1&x-algolia-application-id=JF8Q26WWUD&x-algolia-api-key=MmNmMDdiZmNjNjgxZWJlY2U0ODcyYTI0YTMzYjE4MmFlN2I0ZDE1MTA1NTNhM2IxZTNkMTNkZmRlNTVmZGRhNnRhZ0ZpbHRlcnM9JnVzZXJUb2tlbj04MmViNzgxNDYyNTA1MTVhNjMxMGI4ZmI1Yjk0ZGYyZA%3D%3D';
      const params = {
        data: {
          "requests": [{
            "indexName": "vnw_job_v2",
            "params": `query=&hitsPerPage=${page}&page=1`
          }]
        }
      };
      return this.post(url, params);
    }
    getDetail(url) {
      return superagent.get(`${url}`);
    }
}
export default new CrawlData('https://jf8q26wwud-dsn.algolia.net');
