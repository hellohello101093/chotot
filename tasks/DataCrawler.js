import superagent from 'superagent';
import colors from 'colors';
import fs from 'fs';
require('superagent-proxy')(superagent);

const proxy = ["http://63.150.152.151:3128","http://222.33.192.238:8118","http://101.255.32.42:80","http://220.249.185.178:9797","http://120.28.45.202:8090","http://202.59.163.129:8080"];

class DataCrawler {
  run(url, num) {
    return superagent.get(url).proxy(proxy[0]).then((result) => {
      console.log('done '.green, url);
      console.log('------------------------------');
      return Promise.resolve(result);
    }).catch(() => {
      console.log('error '.red, url);
      console.log('------------------------------'.red);
      const errors = require('../sources/error/timviecnhanh0.json');
      if (errors.indexOf(url) < 0) {
        errors.push(url);
      }
      fs.writeFile("/Users/huynguyen/chithu/chotot/sources/error/timviecnhanh0.json", JSON.stringify(errors), (err) => {
          return Promise.resolve();
      });
    });
  }
}
export default new DataCrawler();
