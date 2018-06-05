/*
 * @Author: fusy
 * @Date: 2018-06-05 16:51:03
 * -----
 * @Modified By: fusy
 * @Last Modified: 2018-06-05 16:51:03
 */
const fsUtil = require('../fsUtil');
const path = require('path');

// fsUtil.mkdirs(path.resolve(__dirname, 'a/b/c'));

fsUtil.createFile(path.resolve(__dirname, 'a/b/c.js'));
