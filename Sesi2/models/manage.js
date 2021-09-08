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

// fungsi getGroupsMatch akan render semua informarsi grup match
const getGroupsMatch = () => {
  // recap
  const tableConfig = {
    head: ['Groups', 'Winner', 'Runner Up']
  };
  const groups = Object.entries(store.getData().groups);
  let content = new Array();
  groups.map(([key, value]) => {
    content.push([
      value.name,
      store.getTeamName(value.winner)||'not yet',
      store.getTeamName(value.runnerup)||'not yet'
    ]);
  });
  mainView.generateView(tableConfig, content, 'GROUP MATCH RECAP');
  console.log('---------------------------------------------------------');
    // ronde 16
  const tableConfigForRound16 = {
    head: ['Time', '', 'Runner Up' ]
  };

  // group match detail
  const tableConfigForMatch = {
    head: ['Time', 'Stadium', 'Home', 'Away', 'Match', 'Score']
  };
  groups.forEach(([key, value]) => {
    let groupMatchs = new Array();
    value.matches.map((list) => {
      groupMatchs.push([
        moment(list.date).calendar(),
        store.getStadiumsName(list.stadium),
        store.getTeamName(list.home_team)||'error',
        store.getTeamName(list.away_team)||'error',
        'match ' + list.name,
        list.home_result + ' : ' + list.away_result
      ]);
    });
    mainView.generateView(tableConfigForMatch, groupMatchs, 'GROUP ' + key  )
  })
}

// fungsi getMatchByGroupName akan render informasi match berdasarkan group
const getMatchByGroupName = (groupName) => {
  const tableConfigForMatch = {
    head: ['Time', 'Stadium', 'Home', 'Away', 'Match', 'Score']
  };
  const groupData = store.getGroupDataByName(groupName);
  let groupMatchs = new Array();
  if (groupData) {
    groupData[1].matches.map((list) => {
      groupMatchs.push([
        moment(list.date).calendar(),
        store.getStadiumsName(list.stadium),
        store.getTeamName(list.home_team)||'error', 
        store.getTeamName(list.away_team)||'error',
        'match ' + list.name,
        list.home_result + ' : ' + list.away_result
      ]);
    });
    mainView.generateView(tableConfigForMatch, groupMatchs, 'GROUP ' + groupName);
  } else {
    console.log("Group doesn't exist.");
  }
}

const refreshData = () => {
  store.refreshData();
}

module.exports = {
  refreshData,
  getStadium,
  getTvChannels,
  getTeams,
  getGroupsMatch,
  getMatchByGroupName
}