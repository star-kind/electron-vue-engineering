/**
 * { function_description }
 *
 * @param      {<type>}          jsonArray  The json array
 * @return     {(Array|string)}  { description_of_the_return_value }
 */
const processJsonArray = (jsonArray) => {
    var objArr = [];

    for (let index in jsonArray) {
        objArr.push(JSON.parse(jsonArray[index]))
    }
    console.dir('\nobjArr: ' + objArr)
    return objArr;
}

module.exports = { processJsonArray };