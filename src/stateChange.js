/**
 * @param xmlHttp
 * @param cb
 * tag
 * code
 * status
 */
module.exports = function stateChange(xhr, cb) {
    return function () {
        var readyState = xhr.readyState;
        if (readyState == 4) {   // 4 = "loaded"
            if (xhr.status == 200) {
                // 200 = OK
                cb('success', 4, 200)
            }
            else {
                cb('error', 4, xmlHttp.status)
            }
        }
    }
}