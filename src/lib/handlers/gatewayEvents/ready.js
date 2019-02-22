module.exports = (payload, client) => {
  console.log(payload)
  client.user = payload.d.user;
  client.sessionID = payload.d.session_id;
  client.guilds = [];
  payload.d.guilds.forEach(guild => {
    client.guilds.push(guild)
  })
  client.guilds.size = client.guilds.length;
  client.guilds.get = (id) => {
    var guild = client.guilds.forEach(guild => {
      if(guild.id === id){
        return guild;
      }
    })
    return guild;
  }
  client.users = []
  client.users.size = client.users.length;
  client.roles = []
  client.roles.size = client.roles.length;
  client.channels = []
  client.channels.size = client.channels.length;

}
