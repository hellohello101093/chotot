import TimViecNhanh from './mains/TimViecNhanh.js';

let site = process.argv[2] || "";

switch (site) {
  case 'timviecnhanh':
    TimViecNhanh.test();
    break;
  case 'muabannet':
    break;
  default:
    console.log('Site is undefined!')
    break
}
