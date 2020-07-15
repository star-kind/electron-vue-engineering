/*获取某个文件夹下的全部后裔文件夹完整路径*/

var fs = require('fs')
var join = require('path').join;

/**
 * Gets the url of destination.
 *
 * @param      {string}  folderName  The folder name
 * @return     {Array}   The url of destination.
 */
const getUrlOfDest = (folderName) => {
    var dirArr = [];

    if (folderName == null || folderName == '') {
        throw Error("Folder Name IS NULL")
        return;
    } else {
        console.log('folderName==' + folderName);
    }

    dirArr = foundByFolderName(folderName, dirArr);
    return dirArr;
}

/**
 * { function_description }
 *
 * @param      {<type>}  path    The path
 * @param      {Array}   dirArr  The dir arr
 * @return     {Array}   { description_of_the_return_value }
 */
function foundByFolderName(path, dirArr) {
    // 返回一个包含指定目录下所有文件名称的数组对象
    let files = fs.readdirSync(path);

    files.forEach(function(item, index) {
        let fileOfPath = join(path, item);
        // 返回一个stat数组对象
        let stat = fs.statSync(fileOfPath);

        if (stat.isDirectory() === true) {
            foundByFolderName(fileOfPath);
        }

        if (stat.isDirectory() === true) {
            dirArr.push(fileOfPath);
        }
    });
    return dirArr;
}

module.exports = {
    getUrlOfDest
}