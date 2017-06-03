import fs from 'fs';
import cheerio from 'cheerio';
import DataCrawler from '../tasks/DataCrawler.js';
import FormatData from '../tasks/FormatData.js';
import ExportCSV from '../tasks/ExportCSV.js';
import Paging from '../tasks/Paging.js';
import CATEGORIES from '../sources/timviecnhanh/category.json';
import { params } from '../config';
import { sleep } from './utils';

const hostName = 'https://www.timviecnhanh.com/';

class TimVietNhanh {
    getCategory() {
      return DataCrawler.run(hostName).then((indexPageData) => {
        const formatedData = FormatData.getCategoryTimViecNhanh(indexPageData.text);
        fs.writeFile("/Users/huynguyen/chithu/chotot/sources/timviecnhanh/category.json", JSON.stringify(formatedData), (err) => {
            if(err) {
                return Promise.reject(err);
            }
            return Promise.resolve('Export Category Done');
        });
      });
    }

    getAllItemLink() {
      const start = 6;
      let sumTotalPage = 0;
      let previousTotalPage = 0;
      for (let i = 6; i < CATEGORIES.length; i++) {
        const currentCategory = CATEGORIES[i];
        sumTotalPage += previousTotalPage;
        const totalPage = Paging.getTotalPage(currentCategory.total, params.timviecnhanh.perPage);
        previousTotalPage = totalPage;
        const timeout = sumTotalPage * 5000;
        setTimeout(() => {
          let links = [];
          console.log(`Exporting Category ${i}...`);
          for (let j = 1; j <= totalPage; j++) {
            const url = `${currentCategory.url}?page=${j}`;
            setTimeout(() => {
              DataCrawler.run(url).then((pageData) => {
                const listUrl = FormatData.getListUrlTimViecNhanh(pageData.text, links);
                links = links.concat(listUrl);
                fs.writeFile(`/Users/huynguyen/chithu/chotot/sources/timviecnhanh/listUrlCate${i}.json`, JSON.stringify(links), (err) => {
                    if(err) {
                        return Promise.reject(err);
                    }
                    return Promise.resolve('Export Urls Done');
                });
              });
              if (j === totalPage) {
                console.log(`Export Category ${i} done!!!`);
              }
            }, j * 5000);
          }
        }, timeout);
      }
    }
}
export default new TimVietNhanh();