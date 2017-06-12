import cheerio from 'cheerio';
import { getCategoryNameTimViecNhanh, getTotalItemCategoryTimViecNhanh } from './utils';
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

function removeBreakCharacters(text) {
  return text.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/  /g, '').replace("'", '').replace('/\/', '');
}

function removeBreakCharactersBody(text) {
  return text.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/  /g, '').replace("'", '').replace('/\/', '');
}

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

    getListUrlMuaBanNet(pageData, nowList) {
      const $ = cheerio.load(pageData);
      let listUrl = [];
      $('.mbn-box-list-content').each( function() {
        const url = $(this).find('a').attr('href');
        if (nowList.indexOf(url) < 0) {
          listUrl.push(url);
        }
      });
      return listUrl;
    }

    getWorkDetailTimViecNhanh(pageData, previousData) {
      const $ = cheerio.load(pageData);
      const defaultData = Object.assign({}, DEFAULT_DATA);
      const textView = $('.detail-content article .bg-nau').text().split('|');
      defaultData.subject = removeBreakCharacters($('.detail-content h1.title').text());
      defaultData.company = removeBreakCharacters($('.detail-content article .p-r-10 h3').text());
      defaultData.body = removeBreakCharacters($('.detail-content article > table').text());
      defaultData.location = removeBreakCharacters($('.detail-content article .p-r-10 span').text());
      defaultData.category = removeBreakCharacters($('.detail-content article .push-right-20 ul li:nth-child(5)').text()).replace('- Ngành nghề:', '');
      defaultData.experience = removeBreakCharacters($('.detail-content article .push-right-20 ul li:nth-child(2)').text()).replace('- Kinh nghiệm:', '');
      defaultData.education = removeBreakCharacters($('.detail-content article .push-right-20 ul li:nth-child(3)').text()).replace('- Trình độ:', '');
      defaultData.level = removeBreakCharacters($('.detail-content article .row .col-xs-4:nth-child(2) ul li:nth-child(4)').text()).replace('- Hình thức làm việc:', '');
      defaultData.view = textView[1] ? removeBreakCharacters(textView[1]).replace(' Lượt xem: ', '') : 0;
      defaultData.expired_date = removeBreakCharacters($('.detail-content article > table tr td .text-danger').text());
      previousData.push(defaultData);
      return previousData;
    }

    getWorkDetailMuaBanNet(pageData, previousData) {
      const $ = cheerio.load(pageData);
      const defaultData = Object.assign({}, DEFAULT_DATA);
      defaultData.ad_id = $('.cl-price-sm .float-left .icon-tag31') ? removeBreakCharacters($('.cl-price-sm .float-left .icon-tag31').parent().text()) : '';
      defaultData.post_date = $('.cl-price-sm .float-left .icon-clock96') ? removeBreakCharacters($('.cl-price-sm .float-left .icon-clock96').parent().text()) : '';
      defaultData.subject = removeBreakCharacters($('.cl-title h1').text());
      defaultData.company = removeBreakCharacters($('.ct-contact .contact-name').text());
      defaultData.body = removeBreakCharactersBody($('.ct-body').text());
      defaultData.location = $('.cl-price-sm .float-left .icon-map5') ? removeBreakCharacters($('.cl-price-sm .float-left .icon-map5').parent().text()) : '';
      defaultData.category = removeBreakCharacters($('.rdfa-breadcrumb div div span:last-child').text());
      defaultData.level = removeBreakCharacters($('.ct-tech ul li:first-child .item-value').text());
      defaultData.phone = `${removeBreakCharacters($('.contact-mobile').text())}`;
      previousData.push(defaultData);
      return previousData;
    }
}
export default new FormatData();
