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
 * { function_description }
 *
 * @param      {<type>}  urlList  The url list
 * @return     {result}  { description_of_the_return_value }
 */
const blvService = function(urlList) {
    console.dir(urlList)
    var cacheUrl = urlList.srcPath;
    var targetUrl = urlList.targetPath;

    var newNamePathArr = [];
    var contentsArr = [];
    var flag = true;

    try {
        var jsonUrlArr = jsonUrlResults.getJsonFiles(cacheUrl);
        console.info('\njsonUrlArr: ' + jsonUrlArr);
    } catch (error) {
        let e = new exception(404, '源目录不存在')
        console.error('\nerror= ' + error + '\n')
        console.dir(e)
        throw e;
    }

    for (let i in jsonUrlArr) {
        contentsArr.push(jsonContent.getContentByPath(jsonUrlArr[i]));
    }
    console.info('\n字符串数组contentsArr: ' + contentsArr);

    var jsonObject = jsonStrArr2Obj.processJsonArray(contentsArr);
    console.dir(jsonObject)

    var newNamesArr = getVideoNewName.getBiliVideoNewName(jsonObject);
    console.info('\nnewNamesArr:');
    console.dir(newNamesArr);

    var blvUrls = getBlvFileUrls.getBlvUrl(cacheUrl);
    console.info('\nblvUrls:');
    console.dir(blvUrls);

    try {
        if (blvUrls.length == newNamesArr.length) {
            for (let n in blvUrls, newNamesArr) {
                console.info('\nblvUrls[n]:' + blvUrls[n])
                console.info('\nnewNamesArr[n]:' + newNamesArr[n])
                newNamePathArr.push(renameFileNew.renameBlvVideo(blvUrls[n], newNamesArr[n]));
            }
        } else {
            let errInfo = '缓存视频出现异常,应该是下载时出错,有的视频未能正常下载成功,导致路径数组与新文件名数组长度有异,请重新检查下载的文件';
            let problem1 = new exception(511, errInfo);
            console.dir(problem1);
            throw problem1;
        }
    } catch (error) {
        console.error(error)
        let problem = new exception(510, '请删除源目录,接着解压备份的压缩文件,并检查缓存的视频文件是否完好,再运行重试')
        console.dir(problem);
        throw problem;
    }
    console.info('\nnewNamePathArr: ' + newNamePathArr);

    try { // TODO 此处无法捕获并抛出异常
        for (let k in newNamePathArr, newNamesArr) {
            moveToOther.moveToDest(newNamePathArr[k], targetUrl, newNamesArr[k])
        }
    } catch (error) {
        flag = false;
        let except = new exception(505, '目的地目录并不存在,请创建好目的地目录后,再试一次')
        console.dir(except);
        console.error(error)
        throw except;
    }

    if (flag) {
        var res = new result(200, '成功提取及移动bilibili视频文件至指定目录', newNamePathArr.length);
        return res;
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

/**
 * 消息返回实体
 *
 * @param      {<type>}  status  The status
 * @param      {<type>}  msg     The message
 * @param      {<type>}  data    The data
 */
const result = function(status, msg, data) {
    this.status = status;
    this.msg = msg;
    this.data = data;
}

module.exports.blvService = blvService;