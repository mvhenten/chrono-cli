#!/usr/bin/env node

const chrono = require('chrono-node');
const strftime = require("strftime");

require('yargs')
    .option("timezone")
    .alias("timezone", "t")
    .describe("timezone", "Timezone, e.g. -0700 for PDT or +0200 for AMS")
    .option("format")
    .alias("format", "f")
    .describe("format", "strftime format string (see 'man strftime')")
    .command(['parse <date...>', '$0 <date...>'], "Parse a natural language date string", () => {}, (argv) => {
        let datestr = argv.date;

        if (Array.isArray(argv.date))
            datestr = datestr.join(" ");

        const date = chrono.parseDate(datestr);

        if (!date) {
            console.error(`Could not parse: ${argv.date}`);
            process.exit(1);
        }

        let formatter = strftime;

        if (argv.timezone)
            formatter = strftime.timezone(argv.timezone);

        let format = argv.format;

        if (!argv.format)
            format = "%FT%TZ";

        console.log(formatter(format, date));
    })
    .example(`$0 "10 days ago" -f "%A"`, "Displays day of the week from 10 days ago")
    .argv;