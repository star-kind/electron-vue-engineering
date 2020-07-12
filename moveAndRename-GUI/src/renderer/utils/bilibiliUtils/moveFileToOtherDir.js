/*复制文件至其它文件夹,若其它文件夹不存在则创建*/
var fs = require('fs')
var path = require('path');

/**
 * { function_description }
 *
 * @param      {<type>}  srcFilePath  The source file path
 * @param      {string}  destPath     The destination path
 * @param      {<type>}  fileName     The file name
 */
exports.moveToDest = (srcFilePath, destPath, fileName) => {
    this.checkDirExist(destPath);
    this.createDirIfNotExist(destPath);

    var srcFileUrl = path.join(srcFilePath);
    var destFileUrl = path.join(destPath, fileName);
    console.info('\n destPath: ' + destPath)
    console.info('\n destFileUrl = ' + destFileUrl)

    fs.rename(srcFileUrl, destFileUrl, function(err) {
        if (err) {
            console.error('再启动运行试一次')
            throw err;
        }

        fs.stat(destPath, function(err, stats) {
            if (err) throw err;
            console.log('stats: ' + JSON.stringify(stats));
            console.info('成功移动文件至新文件夹');
        });
    });
}


/**
 *  判断目录是否存在,返回Promise
 *
 * @param      {<type>}   dirUrl  The dir url
 * @return     {Promise}  { description_of_the_return_value }
 */
exports.dirExist = (dirUrl) => {
    return new Promise((resolve) => {
        //constants:常量,常数
        fs.access(dirUrl, fs.constants.F_OK, (err) => {
            if (err) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

/**
 * { function_description }
 *
 * @param      {<type>}  dirUrl  The dir url
 */
exports.checkDirExist = (dirUrl) => {
    const fn = (dirUrl) => {
        this.dirExist(dirUrl).then((exist) => {
            if (exist) {
                console.log(`${dirUrl} 目录存在`)
            } else {
                console.log(`${dirUrl} 目录并不存在`)
            }
        })
    }
    fn(dirUrl)
}

/**
 * Creates a dir if not exist.
 *
 * @param      {<type>}  dirUrl  The dir url
 */
exports.createDirIfNotExist = (dirUrl) => {
    this.dirExist(dirUrl).then((exist) => {
        if (!exist) {
            fs.mkdirSync(dirUrl, { recursive: true })
        }
    }).then(() => {
        console.log('创建新文件夹完成')
    }).catch((error) => {
        console.error('\nerror==>>' + error + '\n')
        throw error;
    })
}