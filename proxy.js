const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const mdServer = require('./mdServer');
const start = (dir, appServerPort, staticServerPort, markdownServerPort) => {
  // static server
  const staticServer = express();
  staticServer.use(express.static(`${dir}/assets`));
  staticServer.listen(staticServerPort || 3001);

  // markdown server
  mdServer(`${dir}/markdown` ,markdownServerPort || 3002);

  // app
  const app = express();
  app.use('^/assets', createProxyMiddleware({
    target: `http://127.0.0.1:${staticServerPort || 3001}/`,
    changeOrigin: true,
    pathRewrite: {
      '^/assets': ''
    }
  }));

  app.use('^/$', createProxyMiddleware({
    target: `http://localhost:${markdownServerPort || 3002}/index.md`, changeOrigin: true,
    pathRewrite: {
      '^/$': ''
    }
  }));
  app.use('/', createProxyMiddleware({ target: `http://localhost:${markdownServerPort || 3002}`, changeOrigin: true }));

  app.listen(appServerPort || 3000);
}

module.exports = {
  proxy: start
}