const express = require('express');
const fs = require('fs');
const githubMarkdownLightCss = require('./githubMarkdownLightCss');
const hljsTheme = require('./default.min.css.js');
const markdownit = require("markdown-it");
const hljs = require("highlight.js");

const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});

// 获取标题
const getTitle = (str) => {
  const regex = /<h1>(.*?)<\/h1>/;
  const match = str.match(regex);
  if (match) {
    return match[1];
  }
}

const mdServer = (dir, port) => {
  const app = express();
  // 读取 Markdown 文件并将其转换为 HTML
  app.get('*', (req, res) => {
    const filePath = `${dir}${decodeURI(req.originalUrl)}`;
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('无法读取 Markdown 文件');
        return;
      }
      const html = md.render(data);
      const title = getTitle(html);
      const styleSheet = `<style>${githubMarkdownLightCss}</style>`;
      const hljsThemeStyleSheet = `<style>${hljsTheme}</style>`;
      const githubHref = `
        <p class="markdown-static-github">
          Powered by <a href="https://github.com/Joey-Wong/markdown-static">markdown-static</a>
        </p>
      `;
      const fullHtml = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title || ''}</title>
            ${styleSheet}
            ${hljsThemeStyleSheet}
            <style>
              .markdown-body {
                box-sizing: border-box;
                min-width: 200px;
                max-width: 980px;
                margin: 0 auto;
                padding: 45px;
              }
              @media (max-width: 767px) {
                .markdown-body {
                  padding: 15px;
                }
              }
              .markdown-static-github {
                color: #333;
                border-top: 1px solid #d1d9e0b3;
                margin-top: 40px;
                padding: 20px 0;
              }
            </style>
          </head>
          <body>
            <article class="markdown-body">${html}${githubHref}</article>
          </body>
          </html>
        `;

      res.send(fullHtml);
    });
  });

  app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
  });
}

module.exports = mdServer;
