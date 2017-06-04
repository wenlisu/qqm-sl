/**

 @Author：ls
 @Time:2017-05-26

 */

layui.define(function(exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    async function _fetch(postUrl, postDate) {
        try {
            let request = await fetch(postUrl, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postDate)
            });
            let text = await request.text();
            return JSON.parse(text);
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    }
    //输出utilFetch接口
    exports('_fetch', function(url, data) {
        return _fetch(url, data);
    });
});
