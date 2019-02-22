module.exports = async(payload, client, ws, s) => {
  payload.d.members.forEach(async(member) => {
    client.guilds.forEach(async(guild) => {
      if(guild.id === payload.d.guild_id){
        var found = false;
        guild.members.forEach(async(m) => {
          if(found === true){
            return;
          } else {
            if(m.user.id === member.user.id){
              found = true
              return found;
            } else {
              found = false
            }
          }
        })
      }
    })
    user = new User(member.user)
    client.users.push(user)
    if(client.logging === 'all'){
      console.log(`\x1b[32m[    CACHE   ] => MESSAGE: Added User to cache   OBJECT: ${user.username}#${user.discriminator} \x1b[0m`)
    }
  })
}

class User {
  constructor(m){
    this.username = m.username
    this.discriminator = m.discriminator
    this.id = m.id
  }
}

/*
if(guild.members.includes(member)){
  console.log(`\x1b[2m\x1b[43m\x1b[30m${member.user.username}#${member.user.discriminator} was already in guild member array\x1b[0m`)
} else {
  guild.members.push(member)
  console.log(`\x1b[2m\x1b[42m\x1b[30m${member.user.username}#${member.user.discriminator} was added to guild member array\x1b[0m`)
}
if(us.id === user.id){
  console.log(`\x1b[43m\x1b[30m${user.username}#${user.discriminator} was already in cache\x1b[0m`)
  return;
} else {
  client.users.push(user)
  console.log(`\x1b[42m\x1b[30m${user.username}#${user.discriminator} was added to cache\x1b[0m`)
  return;
}*/
