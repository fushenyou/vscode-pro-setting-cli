/*
 * @Author: fusy
 * @Date: 2018-06-05 15:34:27
 * -----
 * @Modified By: fusy
 * @Last Modified: 2018-06-05 15:34:27
 */
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const fsUtil = {};

/**
 * @description 递归创建文件夹
 * @async
 * @param {string} dirpath
 * @returns {Promise} ok or fail;
 */
fsUtil.mkdirs = async function(dirpath) {
    function mkdirs(dirpath, callback) {
        fs.access(dirpath, function(err) {
            if (!err) {
                callback();
            } else {
                //尝试创建父目录，然后再创建当前目录
                mkdirs(path.dirname(dirpath), function() {
                    fs.mkdir(dirpath, callback);
                });
            }
        });
    }
    return new Promise((resolve, reject) => {
        mkdirs(dirpath, function(err) {
            if (err) {
                console.log(chalk.red(err));
                reject(err);
            }
            resolve();
        });
    });
};

/**
 * @async
 * @param {string} filename
 * @param {string|Buffer|Uint8Array} data
 * @param {object<writeFileOptions>|string} options
 * @returns {Promise}
 */
fsUtil.createFile = async function(filename, data, options) {
    const file = path.parse(filename);
    await fsUtil.mkdirs(file.dir);
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, options, function(err) {
            if (err) {
                console.log(chalk.red(err));
                reject(err);
            }
            resolve();
        });
    });
};

module.exports = fsUtil;
