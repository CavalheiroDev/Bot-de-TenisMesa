const axios = require('axios');
const slimbot = require('slimbot');
require('dotenv/config')

async function conexaoBet(event, tokenApi, idSport){

  const response = await axios.get(`https://api.betsapi.com/v1/events/${event}?token=${tokenApi}&sport_id=${idSport}`);

  return response;
}

function bot(message){
  const bot = new slimbot(process.env.TOKEN_TELEGRAM);

  bot.sendMessage(1000081451, message);
}



const events = 'inplay';
const tokenApi = process.env.TOKEN_API_BET;
const idSport = '92';

const places = ['7x0', '0x7', '7x1', '1x7', '7x2', '2x7', '10x0', '0x10', '10x1', '1x10' ,'10x2', '2x10',
                '10x3', '3x10', '10x4', '4x10', '10x5', '5x10'];

const manutent = [];

let verify;

async function startBot(){  
  document.getElementById('status').innerHTML = 'Estou rodando';
  while(verify){
    const api = await conexaoBet(events, tokenApi, idSport);
    const games = await api.data.results;

    games.forEach(game => {
      try{
        const scores =  Object.values(game.scores)
        const scoreGame =  `${scores[scores.length - 1].home}x${scores[scores.length - 1].away}`;
        const message =  `${game.home.name} x ${game.away.name}\n ${scoreGame}`;
        if(places.find(place => place == scoreGame) && !manutent.find(manut => manut == message)){
          bot(message);
          manutent.push(message);
        }
      } catch (e){
        document.getElementById('status').innerHTML = 'Ocorreu um erro, estamos reiniciando.';
        startBot();
      }
    });
  }
}

const button = document.querySelector("#btn");

      async function start() {
        button.style.backgroundColor = await "#FD0101";
        button.textContent = await "STOP";
        await document.getElementById("btn").setAttribute("onclick", "stop()");
        await document.getElementById('btn').setAttribute('class', 'run');
        verify = await true;
        startBot();
        document.getElementById('status').innerHTML = 'Estou rodando';
      }

      async function stop() {
        verify = false;
        button.style.backgroundColor = await "#4cae4c";
        button.textContent = await "START";
        await document.getElementById("btn").setAttribute("onclick", "start()");
        document.getElementById('status').innerHTML = 'Estou parado.';
        await document.getElementById('btn').setAttribute('class', 'not-run');
      }