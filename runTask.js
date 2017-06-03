import VietNamWork from './mains/VietNamWork.js';
import CareerLink from './mains/CareerLink.js';

let site = process.argv[2] || "";

switch (site) {
  case 'vietnamework':
    VietNamWork();
    break;
  case 'careerlink':
    console.log('Getting data...');
    CareerLink();
    break;
  default:
    console.log('Export type undefined!')
    break
}
