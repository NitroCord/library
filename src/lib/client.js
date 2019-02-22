const login = require('./functions/login.js')


const EventEmitter = require('events');


class Client extends EventEmitter {
  constructor(options) {
    super(options)
    this.config = options
    if(options){
      if(options.logSeverity){
        this.config.log = options.logSeverity
      } else {
        this.config.log = 'readyOnly'
      }
    } else {
      this.config = {log:"readyOnly", autoShard:false}
    }
    this.login = (token) => {
      if(typeof token !== 'string'){
        this.emit('error', 'Token can only be of type string')
      } else {
        login(token, this)
      }
    }
    this.uptime = 0
    this.on("ready", () => {
      setInterval(()=>{uptime(this)}, 1);
    })
    this.on('guildAvailable', (guild) => {
      var unavailable = []
      this.guilds.forEach(server => {
        if(server.unavailable === true){
          unavailable.push(server.id)
        } else {
          return;
        }
      })
      if(unavailable.length >= 1){
        if(this.guilds.size >= 15){
          return;
        } else {
          console.log(`waiting for ${unavailable.length} servers to become available before readying`)
        }
      } else {
        this.readyAt = new Date().toISOString();
        if(this.config.log === 'all' || this.config.log === 'events' || this.config.log === 'readyOnly'){
          console.log(`\n\x1b[4m\x1b[1mThe NitroCord Client is now ready (ready at:${client.readyAt})\x1b[0m\n`);
        }
        this.emit('ready', 'The discord client is now ready');
      }
    })
  }
}


module.exports = Client
function uptime(client) {
  client.uptime +=1
}
