/*文件迁徙至新文件夹*/
var fs = require('fs')
var path = require('path')

/**
 * { function_description }
 *
 * @param      {<type>}  srcFilePath     The source file path
 * @param      {<type>}  destPath        The destination path
 * @param      {<type>}  singleFileName  The single file name
 */
const move2Dest = (srcFilePath, destPath, singleFileName) => {
    checkJudgeDirExist(destPath);
    createDirIfNotExist(destPath);

    var srcFileUrl = path.join(srcFilePath);
    var destFileUrl = path.join(destPath, singleFileName);
    console.info('\nsrcFileUrl= ' + srcFileUrl)
    console.info('\ndestFileUrl= ' + destFileUrl)

    fs.rename(srcFileUrl, destFileUrl, function(err) {
        if (err) {
            console.error('请再重试一次')
            throw err;
        }

        fs.stat(destPath, function(err, stats) {
            if (err) throw err;
            console.log('stats: ' + JSON.stringify(stats));
            console.info('迁徙成功...');
        });
    });
}

/**
 *  判断目录是否存在,返回Promise
 *
 * @param      {<type>}   dirUrl  The dir url
 * @return     {Promise}  { description_of_the_return_value }
 */
const judgeDirExist = (dirUrl) => {
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
const checkJudgeDirExist = (dirUrl) => {
    const fn = (dirUrl) => {
        judgeDirExist(dirUrl).then((exist) => {
            if (exist) {
                console.log(`${dirUrl} 目录存在`)
            } else {
                console.log(`${dirUrl} 目录不存在`)
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
const createDirIfNotExist = (dirUrl) => {
    judgeDirExist(dirUrl).then((exist) => {
        if (!exist) {
            fs.mkdirSync(dirUrl, { recursive: true })
        }
    }).then(() => {
        console.log('创建新文件夹完成')
    }).catch((error) => {
        console.error('\nerror= ' + error + '\n')
        throw error;
    })
}

export {
    move2Dest
}