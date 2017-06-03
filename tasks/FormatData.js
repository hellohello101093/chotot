import cheerio from 'cheerio';
import { getCategoryNameTimViecNhanh, getTotalItemCategoryTimViecNhanh } from './utils';

class FormatData {
    getCategoryTimViecNhanh(pageData) {
      const $ = cheerio.load(pageData);
      let categoryData = [];
      $('#nganh-hot li').each( function() {
        const itemCategory = {
          name: getCategoryNameTimViecNhanh($(this).text()),
          url: $(this).find('a').attr('href'),
          total: getTotalItemCategoryTimViecNhanh($(this).text())
        };
        categoryData.push(itemCategory);
      });
      return categoryData;
    }

    getListUrlTimViecNhanh(pageData, nowList) {
      const $ = cheerio.load(pageData);
      let listUrl = [];
      $('.block-item').each( function() {
        const url = $(this).find('a').attr('href');
        if (nowList.indexOf(url) < 0) {
          listUrl.push(url);
        }
      });
      return listUrl;
    }
}
export default new FormatData();
