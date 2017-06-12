import superagent from 'superagent';
import colors from 'colors';
import fs from 'fs';
require('superagent-proxy')(superagent);

const proxy = ["http://123.30.238.16:3128","http://58.59.68.91:9797","http://42.117.1.78:3128","http://123.30.238.16:3128","http://120.28.45.202:8090","http://202.59.163.129:8080"];

class DataCrawler {
  run(url, num) {
    // console.log('proxy'.yellow, proxy[num % 2].yellow);
    return superagent.get(url).proxy(proxy[num % 4]).then((result) => {
      console.log('done '.green, url.green);
      console.log('------------------------------'.green);
      return Promise.resolve(result);
    }).catch(() => {
      console.log('error '.red, url.red);
      console.log('------------------------------'.red);
      return Promise.resolve(null);
    });
  }
}
export default new DataCrawler();
