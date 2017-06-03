import CrawlData from '../tasks/CrawlData.js';
import ExportCSV from '../tasks/ExportCSV.js';
var cheerio = require("cheerio");
import moment from 'moment';
const DEFAULT_DATA = {
  ad_id: '',
  post_time: '',
  post_date: '',
  phone: '',
  company: '',
  subject: '',
  body: '',
  location: '',
  category: '',
  position: '',
  platform: '',
  type: '',
  level: '',
  experience: '',
  education: '',
  view: '',
  applied: '',
  expired_date: ''
};

function formatData(listJobs) {
  const returnData = [];
  for (let i = 0; i < listJobs.length; i++) {
    const data = listJobs[i];
    const defaultData = Object.assign({}, DEFAULT_DATA);
    defaultData.subject = data.jobTitle;
    defaultData.post_time = moment.unix(data.publishedDate).format("DD/MM/YYYY");
    defaultData.post_date = moment.unix(data.publishedDate).format("DD/MM/YYYY");
    defaultData.company = data.company;
    defaultData.subject = data.jobTitle;
    defaultData.body = data.jobRequirement;
    defaultData.location = data.locations && data.locations.join();
    defaultData.category = data.categoryVIs && data.categoryVIs.join();
    defaultData.position = data.jobLevelVI;
    defaultData.platform = 'website';
    defaultData.level = data.jobLevelVI;
    defaultData.experience = data.skills && data.skills.join();
    defaultData.expired_date = moment.unix(data.expiredDate).format("DD/MM/YYYY");
    returnData.push(defaultData);
  }
  return returnData;
}

export default function getVietNameWorkJobs(page) {
  const j = 3;
  for (let j = 1; j < 20; j++) {
    setTimeout(() => {
      const promises = [];
      for (let i = (j - 1) * 50 + 1;i <= j * 50; i++) {
        promises.push(CrawlData.getDataVietNameWork(i));
      }
      Promise.all(promises)
        .then((results) => {
          let ketQua = [];
          for (let k in results) {
            const data = results[k];
            const listJobs = data.results[0].hits;
            ketQua = ketQua.concat(formatData(listJobs));
          }
        ExportCSV.exportCSV(ketQua, '/Users/huynguyen/chithu/chotot/datas/vietnamwork2/vietnamework'+j);
      });
    }, j * 30000);
  }
}
