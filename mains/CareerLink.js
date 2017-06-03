var cheerio = require("cheerio");
import CareerLink from '../tasks/CareerLink.js';
import ExportCSV from '../tasks/ExportCSV.js';
import moment from 'moment';
const DEFAULT_DATA = {
  ad_id: '',
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
  console.log('Formating data...');
  const returnData = [];
  const $ = cheerio.load(listJobs.text);
  // console.log('length', $('body'));
  $('.vieclam_list li').each(function() {
    const defaultData = Object.assign({}, DEFAULT_DATA);
    defaultData.subject = $(this).find('.title').text();
    defaultData.company = $(this).find('.info').text();
    defaultData.location = $(this).find('.khuvuc').text();
    defaultData.post_date = $(this).find('.ngayhethan').text();
    returnData.push(defaultData);
  });
  return returnData;
}

export default function getWorks() {
  for (let j = 1; j <= 1; j++) {
    const promises = [];
    for (let i = 1; i <= 11; i++) {
      promises.push(CareerLink.getData('', i));
    }
    return Promise.all(promises)
      .then((results) => {
        let ketQua = [];
        for (let k in results) {
          const data = results[k];
          ketQua = ketQua.concat(formatData(data.res));
        }
      return ExportCSV.exportCSV(ketQua, '/Users/huynguyen/chithu/chotot/datas/sieuthi/sieuthi'+j);
    });
  }
}
