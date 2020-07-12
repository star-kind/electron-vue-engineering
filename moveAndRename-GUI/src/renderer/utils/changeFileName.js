/*改变文件之名*/

var fs = require('fs')
var path = require('path')

/**
 * { function_description }
 *
 * @param      {string}             fileNameParam  The file name parameter
 * @return     {(string|string[])}  { description_of_the_return_value }
 */
const changedTheFileName = (fileNameParam) => {
    console.log('fileNameParam= ' + fileNameParam)
    var theNewName;
    var theFileUrl;

    if (fileNameParam != null) {
        theFileUrl = getTheFileDir(fileNameParam)
        theNewName = getTheNewFileName(fileNameParam)
    }
    theNewName = path.join(theFileUrl, theNewName);
    console.log('theNewName= ' + theNewName);

    try {
        fs.renameSync(fileNameParam, theNewName)
        console.log("successfully renamed the file...")
        return theNewName;
    } catch (err) {
        throw err
    }
}

/**
 * Gets the new file name.
 *
 * @param      {<type>}  fileNameParam  The file name parameter
 * @return     {string}  The new file name.
 */
const getTheNewFileName = (fileNameParam) => {
    var charsArr = ['Digital', '(', ')', 'Chinese', 'English', 'Japanese', 'COMIC', '[',
        ']', '<\/?[^>]*>', '[^A-Za-z0-9\u4e00-\u9fa5]', ' '
    ];

    var nameArr = fileNameParam.split('/')
    var fileNewName = nameArr[nameArr.length - 2] + nameArr[nameArr.length - 1];

    for (let i in charsArr) {
        fileNewName = fileNewName.replace(/charsArr[i]/g, "");
    }
    console.log('fileNewName= ' + fileNewName)
    return fileNewName;
}

/**
 * Gets the file dir.
 *
 * @param      {string}  fileNameParam  The file name parameter
 * @return     {string}  The file dir.
 */
const getTheFileDir = (fileNameParam) => {
    var pos = fileNameParam.lastIndexOf('/');
    var result = fileNameParam.substring(0, pos + 1);
    return result;
}

export { changedTheFileName, getTheNewFileName }