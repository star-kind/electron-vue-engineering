var fs = require('fs')

/**
 * Gets the content by path.
 *
 * @param      {<type>}  fileUrl  The file url
 * @return     {string}  The content by path.
 */
function getContentByPath(fileUrl) {
    // 同步读取文件内容
    var content = fs.readFileSync(fileUrl, 'utf-8');

    console.info('\ncontent: ' + content.toString() + '\n');
    return content;
}

module.exports = { getContentByPath };