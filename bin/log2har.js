#!/usr/bin/env node
// 
// Convert DevTool trace into HAR
//

'use strict';

const commander = require('commander');
const fs = require('fs')
const ch = require('chrome-har');

let main = async (opt) => {
    let arg = opt.args.shift();
    let buf = fs.readFileSync(arg);
    let events = JSON.parse(buf);
    let har = ch.harFromMessages(events,
        { includeTextFromResponseBody: true });

    process.stdout.write(JSON.stringify(har));
}

commander
    .description('Convert Chrome DevTool log into HAR')
    .version('0.0.1')
    .option('-D, --debug <level>', 'Set debug level', parseInt, 0)
    .parse(process.argv);

if (commander.args.length == 0) {
    commander.help();
}

main(commander);
