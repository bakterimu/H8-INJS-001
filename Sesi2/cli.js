const program = require('commander');
const models = require('./models/manage');

program
  .version('1.0.0')
  .description('World Cup 2018 Russia');

program
  .command('refresh')
  .alias('r')
  .description('Get newest data from server.')
  .action(() => {
    models.refreshData();
  });

program
  .command('stadium')
  .description('Get stadium')
  .action(() => {
    models.getStadium();
  })

program.parse(process.argv);