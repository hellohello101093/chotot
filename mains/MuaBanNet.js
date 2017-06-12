import fs from 'fs';
import DataCrawler from '../tasks/DataCrawler.js';
import FormatData from '../tasks/FormatData.js';
import ExportCSV from '../tasks/ExportCSV.js';
import Paging from '../tasks/Paging.js';
// import CATEGORIES from '../sources/muabannet/category.json';
import { params } from '../config';

class MuaBanNet {
  getAllItemLink() {
    const start = 20;
    let sumTotalPage = 0;
    for (let i = start; i < 38; i++) {
      const currentCategory = CATEGORIES[i];
      const totalPage = Paging.getTotalPage(currentCategory.total, params.muabannet.perPage);
      let links = [];
      console.log(`Exporting Category ${i}...`);
      for (let j = 1; j <= totalPage; j++) {
        const url = `${currentCategory.url}&cp=${j}`;
        DataCrawler.run(url).then((pageData) => {
          if (pageData) {
            const listUrl = FormatData.getListUrlMuaBanNet(pageData.text, links);
            links = links.concat(listUrl);
            fs.writeFile(`/Users/huynguyen/chithu/chotot/sources/muabannet/listUrlCate-new3-${i}.json`, JSON.stringify(links), (err) => {
                if(err) {
                    return Promise.reject(err);
                }
                return Promise.resolve('Export Urls Done');
            });
          } else {
            const linkError = require(`../sources/error/muabannetError.json`);
            linkError.push(url);
            fs.writeFile(`/Users/huynguyen/chithu/chotot/sources/error/muabannetError.json`, JSON.stringify(linkError), (err) => {
                if(err) {
                    return Promise.reject(err);
                }
                return Promise.resolve('Export Urls Done');
            });
          }
        });
      }
    }
  }

  retry() {
    const linkRetry = require(`../sources/error/muabannetError.json`);
    for (let i = 0; i < linkRetry.length; i++) {
      const url = linkRetry[i];
      let links = [];
      DataCrawler.run(url, i).then((pageData) => {
        if (pageData) {
          const listUrl = FormatData.getListUrlMuaBanNet(pageData.text, links);
          links = links.concat(listUrl);
          fs.writeFile(`/Users/huynguyen/chithu/chotot/sources/muabannet/retry-new3-${11107 + i}.json`, JSON.stringify(links), (err) => {
              if(err) {
                  return Promise.reject(err);
              }
              return Promise.resolve('Export Urls Done');
          });
        } else {
          const linkError = require(`../sources/error/muabannetError1.json`);
          if (linkError.indexOf(url) < 0) {
            linkError.push(url);
          }
          fs.writeFile(`/Users/huynguyen/chithu/chotot/sources/error/muabannetError1.json`, JSON.stringify(linkError), (err) => {
              if(err) {
                  return Promise.reject(err);
              }
              return Promise.resolve('Export Urls Done');
          });
        }
      });
    }
  }

  getDetail() {
    let previousData = [];
    let errors = [];
    let done = 0;
    let k = 83;
    fs.readdir(`/Users/huynguyen/chithu/chotot/sources/muabannet`, (err, files) => {
      let listDetailUrl = [];
      let size = 0;
      for (let i = 3; i <= 3; i++) {
        const file = files[i];
        const detailUrls = require(`/Users/huynguyen/chithu/chotot/sources/muabannet/z6.json`);
        listDetailUrl = listDetailUrl.concat(detailUrls);
        size = listDetailUrl.length;
        for (let j = 0; j < listDetailUrl.length; j++) {
          const url = listDetailUrl[j];
          DataCrawler.run(url, j).then((pageData) => {
            done++;
            if (pageData) {
              console.log('number of done', previousData.length);
              previousData = FormatData.getWorkDetailMuaBanNet(pageData.text, previousData);
            } else if (errors.indexOf(url) < 0) {
              console.log('number of error', errors.length);
              errors.push(url);
            }
          });
        }
      }
      setTimeout(() => {
        ExportCSV.exportCSV(previousData, `/Users/huynguyen/chithu/chotot/datas/muabannet/data${k}`);
        fs.writeFile(`/Users/huynguyen/chithu/chotot/sources/muabannet/z6.json`, JSON.stringify(errors));
      }, 60000 * (size / 700 < 1 ? 1 : size / 700));
    })
  }
}
export default new MuaBanNet();
