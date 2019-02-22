const send = require('../../functions/send.js')
module.exports = (payload, client, token) => {
  payload = payload.d
  if(payload.author.id === client.user.id){
    return;
  } else {
    if(payload.member.nick === null || payload.member.nick === undefined){
      payload.member.nick = payload.author.username
    }
    if(payload.member.roles){
      payload.member.roles.forEach(role => {
        console.log(`calculating perms for ${role.id}`)
      })
    }
    console.log(payload)
    payload.respond = (ct) => {
      if(ct){
        id = payload.channel_id
        send('text', 'channel', ct, id, token, client)
      } else {
        console.error("[ERROR] Cannot send emtpy message")
      }
    }
    payload.respond = (ct) => {
      if(ct){
        id = payload.channel_id
        send('text', 'channel', ct, id, token, client)
      } else {
        console.error("[ERROR] Cannot send emtpy message")
      }
    }
    client.emit('message', payload)
  }
}


calcPerms(permInt, perms) {
  if((permInt & 1) == 1){
    perms.createInstantInvite = true
  } else if((permInt & 2) == 2){
    perms.kickMembers = true
  } else if((permInt & 4) == 4){
    perms.banMembers = true
  } else if((permInt & 8) == 8){
    perms.administrator = true
  } else if((permInt & 10) == 10){
    perms.manageChannels = true
  } else if((permInt & 20) == 20){
    perms.manageGuild = true
  } else if((permInt & 40) == 40){
    perms.addReactions = true
  }
  return perms;
}
