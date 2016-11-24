/**
 * @param xmlHttp
 * @param cb
 * tag
 * code
 * status
 */
module.exports = function stateChange(xmlHttp, cb)
{
    if (xmlHttp.readyState==4)
    {   // 4 = "loaded"
        if (xmlHttp.status==200)
        {// 200 = OK
            // ...our code here...
            cb('success', 4, 200)
        }
        else
        {
            cb('error', 4, xmlHttp.status)
        }
    }
}