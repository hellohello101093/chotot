import TimViecNhanh from './mains/TimViecNhanh.js';
import MuaBanNet from './mains/MuaBanNet.js';

let site = process.argv[2] || "";
let num = process.argv[3] || "";
let index = process.argv[4] || 0;

switch (site) {
  case 'timviecnhanh':
    TimViecNhanh.test(num, index);
    break;
  case 'muabannet':
    MuaBanNet.getDetail();
    break;
  default:
    console.log('Site is undefined!')
    break
}
