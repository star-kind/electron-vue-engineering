var fs = require('fs')
/* 使用平台特定的分隔符把全部给定的path片段连接到一起,并规范化生成的路径,
 返回:<string>*/
var join = require('path').join;

/**
 * Gets the json files.
 *
 * @param      {<type>}  jsonPath  The json path
 * @return     {Array}   The json files.
 */
exports.getJsonFiles = (jsonPath) => {
    console.log('jsonPath: ' + jsonPath)
    let jsonFiles = [];
    var jsonArr = [];

    function findJsonFile(path) {
        // 返回一个包含指定目录下所有文件名称的数组对象
        let files = fs.readdirSync(path);
        files.forEach(function(item, index) {
            let fPath = join(path, item);
            // 返回一个stat数组对象
            let stat = fs.statSync(fPath);

            if (stat.isDirectory() === true) {
                findJsonFile(fPath);
            }

            if (stat.isFile() === true) {
                jsonFiles.push(fPath);
            }
        });
    }

    findJsonFile(jsonPath);
    // console.log(jsonFiles);

    var regExpOfPath = new RegExp('/*/entry.json');
    for (let i in jsonFiles) {
        if (regExpOfPath.test(jsonFiles[i])) {
            console.log(jsonFiles[i]);
            jsonArr.push(jsonFiles[i]);
        }
    }

    return jsonArr;
}