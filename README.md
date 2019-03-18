# Nitrocord <u>v0.1.78</u>
Nitrocord is a JavaScript based discord API library designed to be the bridge between your applications and the Discord application.

# Documentation
You can read through the Nitrocord documentation ~~[here](https://fatalcenturion.uk/nitrocord/docs/0.1.71/stable)~~ <u>(not ready yet)<u>

**Installation**:
<li> NPM: <i>npm i nitrocord</i>
<li>Yarn:  <i>yarn add nitrocord</i>

**NOTES**:
<u> if something is scored through it has been made deprecated, ignore this unless you are using the version noted next to it or lower</u>


**Getting Started**:
To get started with Nitrocord, you first need to initiate the client:
```js
const Nitro = require('nitrocord');
const client = new Nitro.Client()
/*you can put some options in the client call
using braces, some basic options to try include:
autoShard: The automatic sharding calculator
ignoreBots: should we allow events caused by robots to be thrown to you?
logging: what would you like the Nitrocord client to log (See the docs page)
*/
```

**Logging In**:
To log in, you need to call the `login()` function.* 
```js
client.login("<Your-Token-Here>")
```

**Subscribing to Events**:
To subscibe to an event, you must use the following function:
```js
/*
	for events, the main ones to use will be:
	ready
	message
	guildCreate
	
	Event naming:
	All events follow the following pattern
	guildCreate
	guildBanAdd
	messageUpdate
	channelDelete
*/
client.on("Event Name", (data) => {
	//do something
})

```
# Advisories


*If you have used the Nitrocord Config Creator tool and saved your token in there then you do not need to provide a token in the login function

# Contact
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTU0NTQ3NzI5XX0=
-->