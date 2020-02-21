//线上环境
let domain = 'https://wangtongxi.cn/';
if (process.env.NODE_ENV === 'development') {
  // 开发环境下，本地地址
  domain = 'http://localhost:3001/';
}
export default domain;
