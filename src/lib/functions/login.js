const handle = require('../handlers/index.js')


const WebSocket = require('ws')
const axios = require('axios')
const os = require('os')
var clt;

module.exports = async(token, client) => {
  client.hbS = []
  client.ping = '100ms (!!default!!)'
  clt = client
  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
  };
  if(client.config.log === 'all' || client.config.log === 'events'){
    console.log(`\x1b[32m[ LOGGING IN ] => EVENT: Getting User Details    STATUS: In Progress...\x1b[0m`)
  }
  var defaults = await getData(token)
  if(client.config.log === 'all' || client.config.log === 'events'){
    console.log(`\x1b[32m[ LOGGING IN ] => EVENT: Getting User Details    STATUS: Completed\x1b[0m`)
  }
  for(var i = 0; i < defaults.shards;i++){
    if(client.config.log === 'all' || client.config.log === 'events'){
      console.log(`\x1b[32m[ LOGGING IN ] => EVENT: Making Shard(s)         STATUS: Making Shard ${i+1} of ${defaults.shards}\x1b[0m`)
    }
    makeClient(i,defaults, token, client)
  }
  if(client.config.log === 'all' || client.config.log === 'events'){
    console.log(`\x1b[32m[ LOGGING IN ] => EVENT: Making Shard(s)         STATUS: Successfully Created ${defaults.shards} Shards\x1b[0m`)
  }
}


async function getData(t) {
  const AuthStr = 'Bot '+t
  var resp = await axios.get('https://discordapp.com/api/v7/gateway/bot', { headers: { Authorization: AuthStr } })
 .catch((error) => {
     console.log('error ' + error);
     process.exit()
  });
  return resp.data;
}

function makeClient(i,df,token,client) {
  var ws = new WebSocket(df.url+'?v=6&encoding=json')
  ws.on('message', async(data) => {
    //console.log(ws.ping())
    if(typeof data === Buffer){
      data = data.toString(data)
      //console.log(data.toString(data))
    }
    try{
      data = JSON.parse(data)
    } catch(e) {
      data = data
    }
    var d = data.d,
        op = data.op,
        s = data.s,
        t = data.t;
        if(client.config.log === 'all' || client.config.log === 'rawEvents'){
          console.log(`\x1b[32m[RAW   DATA] => EVENT: ${t}   DATA STRING: ${JSON.stringify(d)}\x1b[0m`)
        }
    if(op === 10){
      identify(i, df, ws, token)
      //console.log(d)
      setInterval(function() {
        var a = heartbeat(ws,s);
        client.hbS.insert(0, a)
      }, d.heartbeat_interval);
    } else if(op === 0){

      //GateWay Event Handlers
      if(t === 'READY'){
        client.user = d.user
        client.user.setPresence = (json) => {
          ws.send(JSON.stringify({op:3, s:s, d:json}))
        }
        client.user.setStatus = (json) => {
          ws.send(JSON.stringify({op:3, s:s, d:{json}}))
        }
        client.user.setPlaying = (json) => {
          ws.send(JSON.stringify({op:3, s:s, d:json}))
        }
        handle.ready(data, client)
      }/*Message Event Handler(s)*/else if(t==='MESSAGE_CREATE'){
        if(client.config.log === 'all' || client.config.log === 'events'){
          console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   ID: ${d.id}\x1b[0m`)
        }
        handle.messageCreate(data,client,token)
      } else if(t==='MESSAGE_UPDATE'){
        if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   ID: ${d.id}\x1b[0m`)
        }
        handle.messageUpdate(data,client)
      } else if(t==='MESSAGE_DELETE'){
        if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   ID: ${d.id}\x1b[0m`)
        }
        handle.messageDelete(data,client)
      } else if(t==='MESSAGE_DELETE_BULK'){
        if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   ID: ${d.id}\x1b[0m`)
        }
        handle.messageDeleteBulk(data,client)
      } else if(t==='MESSAGE_REACTION_ADD'){
        if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   ID: ${d.id}\x1b[0m`)
        }
        handle.messageReactionAdd(data,client)
      } else if(t==='MESSAGE_REACION_DELETE'){
        if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   ID: ${d.id}\x1b[0m`)
        }
        handle.messageReactionDelete(data,client)
      } else if(t==='MESSAGE_REACTION_REMOVE'){
        if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   ID: ${d.id}\x1b[0m`)
        }
        handle.messageReactionRemove(data,client)
      } else if(t==='MESSAGE_REACTION_REMOVE_ALL'){
        if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   ID: ${d.id}\x1b[0m`)
        }
        handle.messageReactionRemoveAll(data,client)
      }/*Guild Event Handler(s)*/else if(t==='GUILD_CREATE'){
        if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   ID: ${d.id}\x1b[0m`)
        }
        handle.guildCreate(data, client, ws,s)
      } else if(t==='GUILD_MEMBERS_CHUNK'){
        if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   SIZE: ${d.members.length}\x1b[0m`)
        }
        handle.guildMembersChunk(data, client, ws, s)
      }
    } else if(op === 7){
      ws.close(7700)
    } else if(op === 9){
      if(client.config.log === 'all' || client.config.log === 'events'){
      console.log(`\x1b[32m[SOCKET EVENT] => EVENT: ${t}   Time: ${new Date().toISOString()}\x1b[0m`)
      }
    } else if(op === 11){
      var t1 =client.hbS[0];
      var t2 = new Date();
      var ping = t2-t1+'ms'
      client.ping = ping
      console.log(ping)
      if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[5m\x1b[33m[SOCKET EVENT] => EVENT: Heart Beat   Time: ${new Date().toISOString()}\x1b[0m`)
      }
    }
  });

  ws.on('close', (d) => {

    if(d === 7700){
      if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[34m[SOCKET EVENT] => EVENT: SOCKET CLOSED   CLOSE_CODE: 7700    NOTICE: !!RECONNECTING!!\x1b[0m`)
      }
    } else if(d === 1000){
      if(client.config.log === 'all' || client.config.log === 'events'){
        console.log(`\x1b[34m[SOCKET EVENT] => EVENT: SOCKET CLOSED   CLOSE_CODE: 1000    NOTICE: !!RECONNECTING!!\x1b[0m`)
      }

    } else{
      if(client.config.log){
        console.log(`\x1b[34m[SOCKET EVENT] => EVENT: SOCKET CLOSED   CLOSE_CODE: ${d}\x1b[0m`)
          process.exit()
      }
    }
  })
}


function heartbeat(ws, s){
  return new Date()
  ws.send(JSON.stringify({"op": 1,"d": s}), function ack(error) {
    if(error){
      if(error === 'WebSocket is not open: readyState 3 (CLOSED)'){
        console.log('Couldnt connect to API')
        process.exit()
      }
    }
  });
}

function identify(s, df, ws, t) {
  if(df.shards > 1){
    var payload = {
      "op":2,
      "s":null,
      "t":'IDENTIFY',
      "d":{
        "token": t,
        "properties": {
          "$os": os.platform(),
          "$browser": "NitroCord",
          "$device": "NitroCord"
        },
        "compress": false,
        "large_threshold": 250,
        "shard": [s, df.shards]
      }
    }
  } else {
    var payload = {
      "op":2,
      "s":null,
      "t":'IDENTIFY',
      "d":{
        "token": t,
        "properties": {
          "$os": os.platform(),
          "$browser": "NitroCord",
          "$device": "NitroCord"
        },
        "compress": false,
        "large_threshold": 250
      }
    }
  }
  ws.send(JSON.stringify(payload), function ack(error) {
    if(error){
      if(error === 'WebSocket is not open: readyState 3 (CLOSED)'){
        console.log('Couldnt connect to API')
        process.exit()
      }
    }
  });
}
