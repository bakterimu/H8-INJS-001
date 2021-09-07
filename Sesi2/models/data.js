const fileSystem = require('fs');
const db = __dirname + '/../store/db.json';
const http = require('axios');

// fungsi refreshData akan mendapat data dari server lalu save ke store/db.json

const refreshData = () => {
  http.get('https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json')
  .then((res) => {
    fileSystem.writeFileSync(db, JSON.stringify(res.data), 'utf-8');
    console.info('');
    console.info('score is refreshed');
  })
  .catch((err) => {
    console.info(err.message);
  });
}

// fungsi getData akan mengembalikan full data dari store/db.json

const getData = () => {
  return JSON.parse(fileSystem.readFileSync(db, 'utf-8'));
}

// fungsi getTeamId akan mengembalikan objeck yang mengandung detil tim
//@param {int} id
const getTeamId = (id) => {
  const data = getData().teams;
  return data.find(item => item.id == id)
}

// fungsi getChannelById akan mengembalikan objek mengandung detil getChannelById

const getChannelById = (id) => {
  const data = getData().tvchannels;
  return data.find(item => item.id == id)
}

// fungsi getStadiumsById akan mengembalikan objek mengandung detil getStadiums

const getStadiumsById = (id) => {
  const data = getData().stadiums;
  return data.find(item => item.id == id)
}

// fungsi getStadiumsName akan mengembalikan string nama stadiums

const getStadiumsName = (id) => {
  const stadium = getStadiumsById(id);
  if (stadium) {
    return stadium.name;
  } else {
    return null;
  }

// fungsi getGroupDataByName akan mengembalikan objek dari getGroupDataByName

const getGroupDataByName = (name) => {
  const group = Object.entries(getData().groups);
  return group.find(([key, value]) => key == name);
}

// getTeamName akan mengembalikan string team name code

const getTeamName = (id) => {
  const team = getTeamId(id);
  if (team) {
    return team.fifaCode;
  } else {
    return null;
  }
}
module.exports = {
  refreshData,
  getData,
  getGroupDataByName,
  getChannelById,
  getTeamId,
  getStadiumsById,
  getTeamName,
  getStadiumsName,
  getGroupDataByName
}

}