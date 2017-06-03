import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

export default class ApiClient {
  constructor(basePath) {
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](basePath + path);
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
              kaka: 'ssss'
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