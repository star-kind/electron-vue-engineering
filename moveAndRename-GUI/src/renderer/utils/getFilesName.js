/*获取目录下全体文件的文件名集合*/
var fs = require('fs')
var join = require('path').join;

/**
 * Gets the files name arr.
 *
 * @param      {<type>}  path       The path
 * @param      {Array}   fileArray  The file array
 * @return     {Array}   The files name arr.
 */
function getFilesNameArr(path, fileArray) {
    // 返回一个包含指定目录下所有文件名称的数组对象
    let files = fs.readdirSync(path);
    //正则表达式  
    var regExp = new RegExp('/*.jpg');

    files.forEach(function(item, index) {
        let fileOfPath = join(path, item);
        // 返回一个stat数组对象
        let stat = fs.statSync(fileOfPath);

        if (stat.isDirectory() === true) {
            foundByfolderUrl(fileOfPath);
        }

        if (stat.isFile() === true) {
            if (regExp.test(fileOfPath)) {
                fileArray.push(fileOfPath);
            }
        }
    });
    console.info('foundByfolderUrl.fileArray');
    console.dir(fileArray);
    return fileArray;
}

/**
 * Gets the file array.
 *
 * @param      {string}  folderUrl  The folder url
 * @return     {Array}   The file array.
 */
function getTheFileArray(folderUrl) {
    var fileArray = [];

    if (folderUrl == null || folderUrl == '') {
        throw Error("Folder Name IS NULL")
        return;
    } else {
        console.log('folderUrl==' + folderUrl);
    }

    fileArray = getFilesNameArr(folderUrl, fileArray);
    return fileArray;
}

export { getTheFileArray }