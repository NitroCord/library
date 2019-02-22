module.exports = (payload, client, ws, s) => {
  active = false
  payload.d.roles.forEach(role => {
    client.roles.push(role)
  })
  client.guilds.forEach(guild => {
    if(guild.id === payload.d.id){
      guild = payload.d
      //console.log(`UPDATING GUILD: ${guild.id} (now available)`)
      client.emit('guildAvailable', guild)
      active = true
    }
  })
  if(active === false){
    client.guilds.push(payload.d)
    client.emit('guildCreate', payload.d);
  }
}
