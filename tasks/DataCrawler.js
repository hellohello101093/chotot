import superagent from 'superagent';
import colors from 'colors';
require('superagent-proxy')(superagent);
const proxys = [
  'http://94.20.21.38:3128',
  'http://117.164.170.231:8123',
  'http://109.196.127.35:8888',
  'http://31.131.67.76:8080',
  'http://63.150.152.151:3128',
  'http://188.169.123.210:8080',
  'http://120.52.21.132:8082',
  'http://210.211.18.140:808',
  'http://1.179.176.37:8080',
  'http://61.5.207.102:80',
  'http://190.151.10.226:8080',
  'http://118.97.32.226:8080',
  'http://202.166.205.85:8080',
  'http://117.158.1.210:9797',
  'http://77.50.220.92:8080'
];

class DataCrawler {
  run(url) {
    const proxyIndex = parseInt(Math.random() * 14);
    return superagent.get(url).proxy(proxys[proxyIndex]).then(() => {
      console.log('done '.green, url);
      console.log('with proxy'.green, proxys[proxyIndex]);
      console.log('------------------------------');
    }).catch((error) => {
      console.error('error'.red, url);
      console.error('error proxy'.red, proxys[proxyIndex]);
      console.log('------------------------------');
    });
  }
}
export default new DataCrawler();
