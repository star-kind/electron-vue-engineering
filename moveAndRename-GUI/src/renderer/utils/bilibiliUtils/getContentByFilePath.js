var fs = require('fs')

/**
 * Gets the content by path.
 *
 * @param      {<type>}  fileUrl  The file url
 * @return     {string}  The content by path.
 */
function getContentByPath(fileUrl) {
    // 异步读取文件内容
    // fs.readFile(fileUrl, 'utf-8', function(err, data) {
    //     try {
    //         if (data != '' || null) {
    //             console.info('data== ' + data);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // });
    // 同步读取文件内容
    var content = fs.readFileSync(fileUrl, 'utf-8');
    console.info('\n')
    console.info('content: ' + content.toString());
    return content;
}

module.exports = { getContentByPath };