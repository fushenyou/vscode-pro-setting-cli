/*
 * @Author: fusy
 * @Date: 2018-06-05 15:07:29
 * -----
 * @Modified By: fusy
 * @Last Modified: 2018-06-05 15:07:29
 */

module.exports = async function init(sourceDir) {
    const { exec } = require('child_process');
    const setting = require('../config/settings.json');
    const eslint = require('../config/eslintrc.json');
    const path = require('path');
    const fsUtil = require('../common/fsUtil');
    const chalk = require('chalk');

    //1.执行安装code插件命令
    exec('code --install-extension dbaeumer.vscode-eslint');
    exec('code --install-extension esbenp.prettier-vscode');
    exec('code --install-extension psioniq.psi-header');

    //2.添加配置到项目目录
    await fsUtil.createFile(path.resolve(sourceDir, '.eslintrc'), JSON.stringify(eslint, null, 4));
    await fsUtil.createFile(path.resolve(sourceDir, '.vscode', 'settings.json'), JSON.stringify(setting, null, 4));
    console.log(chalk.blue(`******************************************`));
    console.log(chalk.blue(`******* vscode 设置成功 请重启vscode *******`));
    console.log(chalk.blue(`******************************************`));
};
