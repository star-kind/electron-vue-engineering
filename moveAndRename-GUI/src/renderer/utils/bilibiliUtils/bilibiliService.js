/*
0. 传入一个指定路径, 获取匹配entry.json的完整路径之数组
1. 循环路径数组, 读取entry.json中的内容, 返回json字符串
2. 将json格式字符串转换为json对象, 择取 "avid", "title", "page_data.page"
三个节点的值进行拼接为新文件名
3. 将文件重命名为新文件名
4. 移动文件至其它指定目录
*/

var jsonUrlResults = require('./getJsonUrls')
var jsonContent = require('./getContentByFilePath')
var jsonStrArr2Obj = require('./jsonStrArr2Obj')
var getVideoNewName = require('./getVideoNewName')
var getBlvFileUrls = require('./getBlvFileUrls')
var renameFileNew = require('./renameFileNew')
var moveToOther = require('./moveFileToOtherDir')

/**
 * { 业务接口 }
 *
 * @param      {<type>}    req     The request
 * @param      {<type>}    res     The resource
 * @param      {Function}  next    The next
 */
const blvService = function(req, res, next) {
    console.info(req.body)

    var newNamePathArr = [];
    var contentsArr = [];
    var cacheUrl = req.body.srcPath
    var targetUrl = req.body.targetPath
    var flag = true

    try {
        var jsonUrlArr = jsonUrlResults.getJsonFiles(cacheUrl);
        console.info('\njsonUrlArr: ' + jsonUrlArr);
    } catch (error) {
        let e = new exception(404, '源目录不存在')
        console.error('\nerror= ' + error + '\n')
        console.dir(e)
        res.json(e)
        throw e;
    }

    for (let i in jsonUrlArr) {
        contentsArr.push(jsonContent.getContentByPath(jsonUrlArr[i]));
    }
    console.info('\n字符串数组contentsArr: ' + contentsArr);

    var jsonObject = jsonStrArr2Obj.processJsonArray(contentsArr);
    console.dir(jsonObject)

    var newNamesArr = getVideoNewName.getBiliVideoNewName(jsonObject);

    var blvUrls = getBlvFileUrls.getBlvUrl(cacheUrl);
    console.info('\nblvUrls: ' + blvUrls);

    try {
        for (let n in blvUrls, newNamesArr) {
            console.info('\nblvUrls[n]:' + blvUrls[n])
            console.info('\nnewNamesArr[n]:' + newNamesArr[n])
            newNamePathArr.push(renameFileNew.renameBlvVideo(blvUrls[n], newNamesArr[n]));
        }
    } catch (error) {
        console.error('\nerror==> ' + error + '\n')
        let except01 = new exception(510, '请您删除源目录,接着解压备份的压缩文件,再输入地址,运行重试')
        console.dir(except01);
        res.json(except01)
        throw except01;
    }
    console.info('\nnewNamePathArr: ' + newNamePathArr + '\n');

    try { // TODO 此处无法捕获并抛出异常
        for (let k in newNamePathArr, newNamesArr) {
            moveToOther.moveToDest(newNamePathArr[k], targetUrl, newNamesArr[k])
        }
    } catch (error) {
        flag = false;
        let except = new exception(505, '目的地目录并不存在,请创建好目的地目录后,再试一次')
        console.dir(except);
        console.error('\nerror== ' + error + '\n')
        res.json(except);
        throw except;
    }

    if (flag) {
        res.json({ "status": 200, "msg": "", "data": "" })
    }
}

/**
 * { 自有业务异常 }
 *
 * @param      {<type>}  status  The status
 * @param      {<type>}  msg     The message
 */
const exception = function(status, msg) {
    this.status = status;
    this.msg = msg;
}

module.exports.blvService = blvService;