const axios = require('axios');
module.exports = (type, action, content, id, token, client) => {
  if(type === 'text'){
    const payload = {
      "content": content,
      "tts": false,
    }
    if(action === 'dm'){

    } else if(action === 'channel'){
      const AuthStr = 'Bot '+token
      var headers = {
        'Content-Type': 'application/json',
        'Authorization': AuthStr
      }
      axios.post(`https://discordapp.com/api/v7/channels/${id}/messages`, JSON.stringify(payload), {headers: headers})
      .then((response) => {
          client.lastMessage = response.data
      })
      .catch((error) => {
          console.log(error)
          process.exit()
      })
    }
  }
}
