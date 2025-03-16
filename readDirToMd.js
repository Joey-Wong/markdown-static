const fs = require('fs');

const getFlesList = (path) => {
  const result = [];

  function finder(path) {
    const files = fs.readdirSync(path);

    files.forEach((filaName) => {

      const fPath = path + filaName;

      const stats = fs.statSync(fPath);

      if (stats.isDirectory()) {
        finder(fPath + '/');
      }

      if (stats.isFile())
        result.push({
          path: fPath,
          mtime: new Date(stats.mtime).getTime()
        });
    });
  }

  finder(path);

  // 按修改时间排序
  result.sort((a, b) => {
    return b.mtime - a.mtime;
  })

  return result;
}

const writeDirectoryIndex = (path) => {
  const filesList = getFlesList(path);

  const newContent = filesList.map(item => {
    const filaName = item.path.substr(item.path.lastIndexOf('/') + 1);
    return filaName === 'index.md' ? '' : `* [${filaName}](${encodeURIComponent(filaName)})\r\n`;
  })

  const mdContent = `# 目录\r\n${newContent.join('')}`
  fs.writeFileSync(path + '/index.md', mdContent)
}

module.exports = {
  writeDirectoryIndex: writeDirectoryIndex
}