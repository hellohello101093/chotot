import fs from 'fs';
import cheerio from 'cheerio';
import DataCrawler from '../tasks/DataCrawler.js';
import FormatData from '../tasks/FormatData.js';
import ExportCSV from '../tasks/ExportCSV.js';
import Paging from '../tasks/Paging.js';
import CATEGORIES from '../sources/timviecnhanh/category.json';
import { params } from '../config';

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
      let links = [];
      for (let i = 0; i < CATEGORIES.length; i++) {
        const currentCategory = CATEGORIES[i];
        const totalPage = Paging.getTotalPage(currentCategory.total, params.timviecnhanh.perPage);
        if (totalPage < 10) {
          for (let j = 1; j <= totalPage; j++) {
            const url = `${currentCategory.url}?page=${j}`;
            setTimeout(() => {
              DataCrawler.run(url).then((pageData) => {
                const listUrl = FormatData.getListUrlTimViecNhanh(pageData.text, links);
                links = links.concat(listUrl);
                fs.writeFile("/Users/huynguyen/chithu/chotot/sources/timviecnhanh/listUrl.json", JSON.stringify(links), (err) => {
                    if(err) {
                        return Promise.reject(err);
                    }
                    console.log('write done');
                    return Promise.resolve('Export Urls Done');
                });
              });
            }, j * 5000);
          }
        }
      }
    }
}
export default new TimVietNhanh();
