import json2csv from 'json2csv';
import fs from 'fs';
const fields = [
  'ad_id', 'post_time', 'post_date', 'phone', 'company',
  'subject', 'body', 'location', 'category', 'position',
  'platform', 'type', 'level', 'experience', 'education',
  'view', 'applied', 'expired_date'
];
class ExportCSV {
    exportCSV(data, filename) {
      const csv = json2csv({ data: data, fields: fields });
      return Promise.resolve(
        fs.writeFile(`${filename}.csv`, csv, (err) => {
          if (err) throw err;
          console.log('File saved');
        })
      );
    }
}
export default new ExportCSV();