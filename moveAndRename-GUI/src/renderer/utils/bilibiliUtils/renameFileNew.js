var fs = require('fs')

/**
 * { function_description }
 *
 * @param      {string}  oldVideoPath  The old video path
 * @param      {string}  newVideoName  The new video name
 * @return     {string}  { description_of_the_return_value }
 */
exports.renameBlvVideo = (oldVideoPath, newVideoName) => {
    //根据旧文件名文件路径截取视频所在目录路径
    try {
        var index = oldVideoPath.lastIndexOf('/');
        var url = oldVideoPath.substring(0, index + 1);
    } catch {
        console.error('\n若此处报错,只能删除原文件夹,再解压备份的压缩文件,运行重试\n');
    }

    var newNamePath = url + newVideoName;
    console.info('newNamePath:' + newNamePath);

    fs.rename(oldVideoPath, newNamePath, function(err) {
        if (!err) {
            console.info('重命名文件成功');
            console.info('新文件名: ' + newNamePath);
        } else {
            console.error(err);
            throw err;
        }
    })
    return newNamePath;
}