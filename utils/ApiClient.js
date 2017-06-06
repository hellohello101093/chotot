import superagent from 'superagent';
require('superagent-proxy')(superagent);

const methods = ['get', 'post', 'put', 'patch', 'del'];
const proxy = 'http://168.63.43.102:3128';

export default class ApiClient {
  constructor(basePath) {
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](basePath + path).proxy(proxy);
        if (params) {
          request.query(params);
        }
        if (data) {
          request.send(data);
        }

        request.end((err, response) => {
          if (response) {
            const { body } = response;
            if (err) {
              reject(err || body);
            } else if (body && body.error) {
              reject(body.error || body);
            } else {
              resolve(body);
            }
          } else {
            reject({
              error: {
                message: 'Có lỗi xảy ra, vui lòng thử lại'
              }
            });
          }
        });
      });
    });
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
