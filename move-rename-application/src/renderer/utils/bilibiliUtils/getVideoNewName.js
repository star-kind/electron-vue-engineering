/**
 * Gets the bili video new name.
 *
 * @param      {<type>}  jsonObject  The json object
 * @return     {Array}   The bili video new name.
 */
const getBiliVideoNewName = (jsonObject) => {
    var strArr = []
    try {
        for (let index in jsonObject) {
            let str = ''
            str += jsonObject[index].avid;
            str += '-'
            str += jsonObject[index].title.replace(/【/g, '').replace(/】/g, '').replace(/《/g, '').replace(/》/g, '').replace(/\//g, '');
            str += '-'
            str += jsonObject[index].page_data.page;
            str += '.mp4';

            strArr.push(str);
        }
    } catch (err) {
        console.log('国产动画缓存...')
        console.log(err);
        for (let n in jsonObject) {
            let str = '';
            str += jsonObject[n].ep.av_id;
            str += '-';
            str += jsonObject[n].title;

            str += '-'
            str += jsonObject[n].ep.index_title.replace(/【/g, '').replace(/】/g, '').replace(/《/g, '').replace(/》/g, '');
            str += '-'
            str += jsonObject[n].ep.page;
            str += '.mp4';

            strArr.push(str);
        }
    }
    console.table(strArr)
    return strArr;
}

module.exports = { getBiliVideoNewName }