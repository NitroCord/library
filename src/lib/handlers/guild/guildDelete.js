module.exports = (payload, client, ws, s) => {
  if(client.logging === 'all' || client.logging === 'events'){
    console.log(`\x1b[32m[SOCKET EVENT] => EVENT: GUILD_DELETE   ID: ${payload.d.id}\x1b[0m`)
  }
  client.emit('guildDelete', payload.s);
}
