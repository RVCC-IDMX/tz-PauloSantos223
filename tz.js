const moment = require('moment-timezone');
const yargs = require('yargs');

moment.tz.setDefault('America/New_York');

const options = yargs
  .usage('Usage: node <script-file> --timezone [timezone] [--format]')
  .option('timezone', {
    describe: 'The target timezone',
    demandOption: true,
    type: 'string',
  })
  .option('format', {
    describe: 'Include formatting string',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h')
  .argv;

const { timezone, format } = options;

if (!moment.tz.zone(timezone)) {
  console.error('Invalid timezone provided.');
  process.exit(1);
}

let time = moment().tz(timezone);

if (format) {
  time = time.format('dddd, MMMM Do YYYY, h:mm:ss a');
}

console.log(`The time at the ${timezone} timezone is ${time}`);
