#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const requiredVersion = require('../package.json').engines.node;

if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(
        chalk.red(
            '\n[vscode-pro-setting-cli]:' +
                `\n你使用的node版本 ${process.version}, ` +
                `vscode-pro-setting-cli 最低node版本 ${requiredVersion}.\nPlease upgrade your Node version.\n`
        )
    );
    process.exit(1);
}

const path = require('path');
const init = require('../lib/init');

const program = require('commander');

program.version(require('../package.json').version).usage('<command> [options]');

program
    .command('init [targetDir]')
    .description('start development server')
    .action((dir = '.') => {
        wrapCommand(init)(path.resolve(dir));
    });

// output help information on unknown commands
program.arguments('<command>').action((cmd) => {
    program.outputHelp();
    console.log(chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
    console.log();
});

// add some useful info on help
program.on('--help', () => {
    console.log();
    console.log(`  Run ${chalk.cyan('vuepress <command> --help')} for detailed usage of given command.`);
    console.log();
});

program.commands.forEach((c) => c.on('--help', () => console.log()));

// enhance common error messages
const enhanceErrorMessages = (methodName, log) => {
    program.Command.prototype[methodName] = function(...args) {
        if (methodName === 'unknownOption' && this._allowUnknownOption) {
            return;
        }
        this.outputHelp();
        console.log('  ' + chalk.red(log(...args)));
        console.log();
        process.exit(1);
    };
};

enhanceErrorMessages('missingArgument', (argName) => {
    return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
});

enhanceErrorMessages('unknownOption', (optionName) => {
    return `Unknown option ${chalk.yellow(optionName)}.`;
});

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
    return `Missing required argument for option ${chalk.yellow(option.flags)}` + (flag ? `, got ${chalk.yellow(flag)}` : '');
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

function wrapCommand(fn) {
    return (...args) => {
        return fn(...args).catch((err) => {
            console.error(chalk.red(err.stack));
        });
    };
}
