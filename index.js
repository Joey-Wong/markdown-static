const { writeDirectoryIndex } = require('./readDirToMd');
const { proxy } = require('./proxy');
const start = (dir, t) => {
    setTimeout(() => {
        writeDirectoryIndex(dir);
        console.log(`[${(new Date()).toString()}]:${dir} to index.md success.`)
        start(dir, t);
    }, t);
}

const markdownStatic = (params) => {
    start(`${params.rootDir}/markdown/`, params.delayMS || 1000 * 5);
    proxy(params.rootDir, params.appServerPort || 3000, params.staticServerPort || 3001, params.markdownServerPort || 3002);
}

module.exports = markdownStatic;
