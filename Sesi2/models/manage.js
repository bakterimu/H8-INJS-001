const store = require('./data');
const mainView = require('./../views/tableView')
const moment = require('moment');

// fungsi getStadium akan render nama stadiums dan detail


const getStadium = () => {
  const tableConfig = {
    head: ['Stadium Name', 'City']
  };
  const stadiums = store.getData().stadiums;
  let content = new Array();
  stadiums.map((list, index) => {
    content.push([list.name, list.city])
  });
  mainView.generateView(tableConfig, content, 'STADIUM LIST NAME')
}

// fungsi getTvChannels akan render tv channels 
const getTvChannels = () => {
  const tableConfig = {
    head: ['Channel Name', 'Country', 'Iso2', 'Language']
  };
  const tvChannels = store.getData().tvchannels;
  let content = new Array();
  tvChannels.map((list, index) => {
    content.push([
      list.name,
      list.country,
      list.iso2,
      list.lang.toString()
    ]);
  });
  mainView.generateView(tableConfig, content, 'CHANNEL TV LIST')
}

// fungsi getTeams akan render informasi teams
const getTeams = () => {
  const tableConfig = {
    head: ['No', 'Country', 'FIFA Code'],
    colWidths: [4, 40, 30]
  };
  const teams = store.getData().teams;
  let content = new Array();
  teams.map((list, index) => {
    content.push([
      index + 1,
      list.name,
      list.fifaCode
    ]);
    mainView.generateView(tableConfig, content, 'WORLD CUP TEAMS');
  })
}