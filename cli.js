#!/usr/bin/env node

const chrono = require("chrono-node");
const strftime = require("strftime");

require("yargs")
    .example(
        `$0 "10 days ago" -f "%A"`,
        "Displays day of the week from 10 days ago"
    )
    .option("offset", {
        describe: "Timezone, e.g. -0700 for PDT or +0200 for AMS",
        type: "string"
    })
    .alias("offset", "o")
    .option("format", {
        describe: "strftime format string (see 'man strftime')",
        type: "string"
    })
    .alias("format", "f")
    .command(
        ["$0 <date...>"],
        "Parse a natural language date string",
        () => {},
        argv => {
            let datestr = argv.date;

            if (Array.isArray(argv.date)) datestr = datestr.join(" ");

            const date = chrono.parseDate(datestr);

            if (!date) {
                console.error(`Could not parse: ${argv.date}`);
                process.exit(1);
            }

            let formatter = strftime;

            if (argv.offset) formatter = strftime.timezone(argv.offset);

            let format = argv.format;

            if (!argv.format) format = "%F %T%z";

            console.log(formatter(format, date));
        }
    ).argv;
