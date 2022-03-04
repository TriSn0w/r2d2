const Discord = require('discord.js'); //Define the discord.js module
const client = new Discord.Client()
const snipes = new Discord.Collection();
const play = require('play-dl');
const connections = []
const lyric = []
const loop = []
const queue = new Array()
const disbut = require('discord-buttons')(client)

client.on("messageDelete", message => {
  snipes.set(message.channel.id, message)
})
const stations = require('./stations.js')


client.on('ready', () => {
  client.user.setActivity('d2!help')
  
  // 
  client.guilds.cache.forEach(server => {
    queue[server.id] = [];
    setInterval(function() {
    queue.push(queue[server.id])
    }, 1000)
  })
})

client.on('message', async message => {
   const args = message.content.slice().trim().split(' ');

  if (message.content.toLowerCase().startsWith("d2!file")) {
    if (args[1]) {
const file = args[1]
currentStation = 'File Link'
if (!file.includes('http') || !file.includes('https')) {
message.reply('Your link is not a HTTP/HTTPS link!')
}

connection = await message.member.voice.channel.join()

    connections[message.guild.id] = connection.play(args[1]);

connections[message.guild.id].on('start', () => {
  const embed = new Discord.MessageEmbed()
  embed.setDescription(`Your audio URL is now playing!`)
  embed.setFooter('Made with love by ' + 'TheSecretGunner#0001')
  message.channel.send(embed)
})

connections[message.guild.id].on('finish', () => {
	const embed = new Discord.MessageEmbed()
  embed.setDescription(`Your audio url has finished playing!`)
  embed.setFooter('Made with love by ' + 'TheSecretGunner#0001')
  message.channel.send(embed)
});

// Always remember to handle errors appropriately!
connections[message.guild.id].on('error', console.error);
    } else {
    if (message.attachments.size > 0) {
message.attachments.forEach(async file => {
  currentStation = file.name
connection = await message.member.voice.channel.join()

    connections[message.guild.id] = connection.play(file.attachment);
const name = file.name.toString()
connections[message.guild.id].on('start', () => {
  const embed = new Discord.MessageEmbed()
  embed.setDescription(`${name} is now playing!`)
  embed.setFooter('Made with love by ' + 'TheSecretGunner#0001')
  message.channel.send(embed)
})

connections[message.guild.id].on('finish', () => {
	const embed = new Discord.MessageEmbed()
  embed.setDescription(`${name} has finished playing!`)
  embed.setFooter('Made with love by ' + 'TheSecretGunner#0001')
  message.channel.send(embed)
});

// Always remember to handle errors appropriately!
connections[message.guild.id].on('error', console.error);
})
    }
  }
  }
  if (message.content.toLowerCase() == "d2!snipe") {
    let snipe = snipes.get(message.channel.id)
    if (!snipe) return message.channel.send("No previously deleted chat!!")
    
    const snipeEmbed = new Discord.MessageEmbed()
    .setAuthor(`${snipe.author.tag}`, snipe.author.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription(snipe)
    .setTimestamp()
    .setFooter("Get sniped lmao")
    message.channel.send(snipeEmbed)
  }
  if (message.content.toLowerCase().startsWith('d2!suggest')) {
    const args = message.content.slice().trim().split(' ');
    const suggestion = args.splice(1).join(" ")
    if (message.content.toLowerCase() == "d2!suggestions") return;
    if (!suggestion) return message.channel.send('You didnt include a suggestion :angry:')

    message.channel.send('Sent your suggestion to the bot maker! :smile:')
    client.users.fetch("743630714985250928").then(user => user.send('New suggestion: ' + suggestion))
    const fs = require('fs')
    fs.appendFile('suggestions.txt', '\n' + `${message.author}` + ': ' + suggestion, (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
  }
  if (message.content.toLowerCase().startsWith('d2!play')) {
    
    const ytly = require('ytly');  
// Get song lyrics  
const lyrics = await ytly.get.lyrics(video.url);
lyric[message.guild.id] = lyrics 
    const args = message.content.slice().trim(1).split(/ +/g);
 try {
    if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!')

 const yts = require( 'yt-search' )
const r = await yts(args.splice(1).join(" ") + ' song')
connection = await message.member.voice.channel.join();
        connection.voice.setSelfDeaf(true)

const videos = r.videos.slice( 0, 1 )
   const video = videos[0]
  
connection = await message.member.voice.channel.join();
        connection.voice.setSelfDeaf(true)

 connection.voice.setSelfMute(false)
            if(queue[message.guild.id].length == 0) {
          const source = await play.stream(video.url) // YouTube Video Stream
              
connections[message.guild.id] = connection.play(source.stream, { type: source.type })
queue[message.guild.id].push({ id : '0', video: video })
              
connections[message.guild.id].on('start', () => {
  const embed = new Discord.MessageEmbed()
    embed.setAuthor(video.title, 'https://i.ibb.co/XzMTygw/859459305152708630.gif')
  embed.setThumbnail(video.thumbnail)
  embed.setDescription(video.description)
  embed.addFields(
    [
      {
        name: "Duration",
        value: video.timestamp
      },
      {
        name: 'Queue Position', value: '`' +  `${queue[message.guild.id].length }`  + '`'
      }, 
      { name: 'Author', value: `[${video.author.name}](${video.author.url})`
      }
    ]
  )
  message.channel.send(embed).then(message => {
  message.react('🎤')
    message.react('🔁')
  });
});

connections[message.guild.id].on('finish', async () => {
  if (loop[message.guild.id] == "on") {
    queue[message.guild.id].shift()
    for (let item of queue[message.guild.id]) {
      let video = item.video
    const source = await play.stream(video.url) // YouTube Video Stream
              
connections[message.guild.id] = connection.play(source.stream, { type: source.type })

      connections[message.guild.id].on('start', () => {
  const embed = new Discord.MessageEmbed()
    embed.setAuthor(video.title, 'https://i.ibb.co/XzMTygw/859459305152708630.gif')
  embed.setThumbnail(video.thumbnail)
  embed.setDescription(video.description)
  embed.addFields(
    [
      {
        name: "Duration",
        value: video.timestamp
      },
      {
        name: 'Queue Position', value: '`' +  `${queue[message.guild.id].length }`  + '`'
      }, 
      { name: 'Author', value: `[${video.author.name}](${video.author.url})`
      }
    ]
  )
  message.channel.send(embed).then(message => {
  message.react('🎤')
    message.react('🔁')
  });
});

      connections[message.guild.id].on('finish', async () => {
        play()
      })
    }
    } else {
    const vid = video;
    if (queue[message.guild.id].length >= 1) {
      for (let queueitem of queue[message.guild.id]) {
        async function queuePlay() {
      queue[message.guild.id].shift()
       try {
         const source = await play.stream(queue[message.guild.id][0].video.url) // YouTube Video Stream
              
connections[message.guild.id] = connection.play(source.stream, { type: source.type })
         
         const video = queue[message.guild.id][0].video

           const lyrics = ytly.get.lyrics(video.url);
lyric[message.guild.id] = lyrics 

  connections[message.guild.id].on('start', () => {
  const embed = new Discord.MessageEmbed()
    embed.setAuthor(video.title, 'https://i.ibb.co/XzMTygw/859459305152708630.gif')
  embed.setThumbnail(video.thumbnail)
  embed.setDescription(video.description)
  embed.addField('Duration', video.timestamp)
  embed.addField('Queue Position', '`' + queue[message.guild.id].length + 1 + '`')
  embed.addField('Author', `[${video.author.name}](${video.author.url})`)
  message.channel.send(embed).then(message => {
  message.react('🎤')
    message.react('🔁')
  });
});

      connections[message.guild.id].on('finish', async () => {
        const embed = new Discord.MessageEmbed()
  embed.setDescription(video.title + ` has finished playing!`)
  embed.setFooter('Made with love by ' + 'TheSecretGunner#0001')
  message.channel.send(embed)
        queuePlay()
      })
        } catch(err) {
message.channel.send(`:warning: Oops! Something went wrong on our end. Don't be scared. It was probably our fault...`)
         message.channel.send(`\`\`\`${err}\`\`\``)
          } 
        }
    } 
    } else {
      const embed = new Discord.MessageEmbed()
  embed.setDescription(vid.title + ` has finished playing!`)
  embed.setFooter('Made with love by ' + 'TheSecretGunner#0001')
  message.channel.send(embed)
    }
  }
});

// Always remember to handle errors appropriately!
connections[message.guild.id].on('error', error => message.channel.send(':warning: Oops! Something went wrong on our end. Don\'t be scared. It was probably our fault...\n```' + error + '```'));
          } else {
             message.channel.send(`Added ${video.title} to queue`)
               queue[message.guild.id].push({ id : queue[message.guild.id].length + 1, video: video })
            }
          } catch(err) {
message.channel.send(`:warning: Oops! Something went wrong on our end. Don't be scared. It was probably our fault...`)
         message.channel.send(`\`\`\`${err}\`\`\``)
          }  
  }

if (message.content.toLowerCase() == "d2!ping") {
  if (client.ws.ping < 90) {
   desc = 'Audio quality should be pretty good while playing music and news.'
  } else if (client.ws.ping < 230) {
   desc = 'Audio quality may get worse. Lag may occur'
  } else {
desc = 'Audio quality is bad. Lag is expected.'
  }

  message.channel.send('<a:online_ping:891317323909193738> Ping is ' + client.ws.ping + 'ms.\n' + desc)
}
if (message.content.toLowerCase() == "d2!stop" ||  message.content.toLowerCase() == "d2!leave") {
  message.member.voice.channel.leave()
  message.channel.send('Thanks for playing music! I will see you next time :smile:')
  return
}

  if (message.content.toLowerCase() == "d2!pause") {
    if (connection) {
      connections[message.guild.id].pause()
      message.channel.send('Song Paused :pause_button:')
    } else {
       message.channel.send('No songs are playing right now! :warning:')
     }
  }

  if (message.content.toLowerCase() == "d2!resume") {
    if (connection) {
      connections[message.guild.id].resume()
      message.channel.send('Song Resumed :arrow_forward:')
    } else {
       message.channel.send('No songs are paused right now! :warning:')
     }
  }

if (message.content.toLowerCase() == "d2!help") {
  const embed = new Discord.MessageEmbed()
  embed.setTitle('R2D2 | Help')
  embed.addField('d2!help', 'Shows this page')

	embed.addField('d2!link [youtube link]', 'Plays a youtube link')
  embed.addField('d2!file [link / file upload]', 'Plays music from a audio link')
  embed.addField('d2!ping', 'Shows ping')
   embed.addField('d2!play [query]', 'Plays your song of choice')
  embed.addField('d2!suggest', 'Suggest a radio stations to add to R2D2')
  embed.setFooter('Made with love by ' + 'TheSecretGunner#0001\n Inspired by taigo#0828\'s bot, VocalRad')
  embed.setColor('RANDOM')
  message.channel.send(embed)
}

  if (message.content.toLowerCase().startsWith("d2!loop")) {
    if (args[1] === "on") {
      message.channel.send('Loop is on :repeat:')
      loop[message.guild.id] == "on"
    } else {
      message.channel.send('Loop is off :negative_squared_cross_mark: :repeat:')
      loop[message.guild.id] == "not on"
    }
  }

  if (message.content.toLowerCase() === "d2!queue") {
  if (queue[message.guild.id].length > 0) {
    const embed = new Discord.MessageEmbed
      embed.setTitle('Queue for ' + message.guild.name)
    var i = 0
    for (let queueitem of queue[message.guild.id]) {
      embed.addField(`(${i}): ${queueitem.video.title}`, queueitem.video.timestamp)
      var i = i+=1
    }

    message.channel.send(embed).then(msg => msg.react('❌'))
  } else {
    const embed = new Discord.MessageEmbed
      embed.setTitle('Queue for ' + message.guild.name)
    embed.setDescription(':warning: There is no queue')
     message.channel.send(embed)
  }
  }

   if (message.content.toLowerCase() == "d2!skip") {
     queue[message.guild.id].shift()
     if (queue[message.guild.id].length <= 0) {
       return message.channel.send('You have no songs after the one thats currently playing, so we can\'t skip.')
     } else {
       const video = queue[message.guild.id][0].video

     try {
    if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!')
connection = await message.member.voice.channel.join();
        connection.voice.setSelfDeaf(true)

 connection.voice.setSelfMute(false)
const source = await play.stream(video.url) // YouTube Video Stream
              
connections[message.guild.id] = connection.play(source.stream, { type: source.type })
queue[message.guild.id].push({ id : '0', video: video })
              
connections[message.guild.id].on('start', () => {
  const embed = new Discord.MessageEmbed()
    embed.setAuthor(video.title, 'https://i.ibb.co/XzMTygw/859459305152708630.gif')
  embed.setThumbnail(video.thumbnail)
  embed.setDescription(video.description)
  embed.addFields(
    [
      {
        name: "Duration",
        value: video.timestamp
      },
      {
        name: 'Queue Position', value: '`' +  `${queue[message.guild.id].length }`  + '`'
      }, 
      { name: 'Author', value: `[${video.author.name}](${video.author.url})`
      }
    ]
  )
  message.channel.send(embed).then(message => {
  message.react('🎤')
    message.react('🔁')
  });
});



    const ytly = require('ytly');  
// Get song lyrics  
const lyrics = await ytly.get.lyrics(video.url);
lyric[message.guild.id] = lyrics 

connections[message.guild.id].on('finish', () => {
  if (loop[message.guild.id] == "on") {
    queue[message.guild.id].shift()
    for (let item of queue[message.guild.id]) {
      let video = item.video
    connections[message.guild.id] = connection.play(ytdl.stream(video.url));

      connections[message.guild.id].on('start', () => {
  const embed = new Discord.MessageEmbed()
    embed.setAuthor(video.title, 'https://i.ibb.co/XzMTygw/859459305152708630.gif')
  embed.setThumbnail(video.thumbnail)
  embed.setDescription(video.description)
  embed.addFields(
    [
      {
        name: "Duration",
        value: video.timestamp
      },
      {
        name: 'Queue Position', value: '`' +  `${queue[message.guild.id].length }`  + '`'
      }, 
      { name: 'Author', value: `[${video.author.name}](${video.author.url})`
      }
    ]
  )
  message.channel.send(embed).then(message => {
  message.react('🎤')
    message.react('🔁')
  });
});

      connections[message.guild.id].on('finish', async () => {
        play()
      })
    }
    } else {
    const vid = video;
    if (queue[message.guild.id].length >= 1) {
      for (let queueitem of queue[message.guild.id]) {
        function queuePlay() {
      queue[message.guild.id].shift()
       try {
       connections[message.guild.id] = connection.play(ytdl(queue[message.guild.id][0].video.url));
         
         const video = queue[message.guild.id][0].video

           const lyrics = ytly.get.lyrics(video.url);
lyric[message.guild.id] = lyrics 

  connections[message.guild.id].on('start', () => {
  const embed = new Discord.MessageEmbed()
    embed.setAuthor(video.title, 'https://i.ibb.co/XzMTygw/859459305152708630.gif')
  embed.setThumbnail(video.thumbnail)
  embed.setDescription(video.description)
  embed.addField('Duration', video.timestamp)
  embed.addField('Queue Position', '`' + queue[message.guild.id].length + 1 + '`')
  embed.addField('Author', `[${video.author.name}](${video.author.url})`)
  message.channel.send(embed).then(message => {
  message.react('🎤')
    message.react('🔁')
  });
});

      connections[message.guild.id].on('finish', async () => {
        const embed = new Discord.MessageEmbed()
  embed.setDescription(video.title + ` has finished playing!`)
  embed.setFooter('Made with love by ' + 'TheSecretGunner#0001')
  message.channel.send(embed)
        queuePlay()
      })
        } catch(err) {
message.channel.send(`:warning: Oops! Something went wrong on our end. Don't be scared. It was probably our fault...`)
         message.channel.send(`\`\`\`${err}\`\`\``)
          } 
        }
    } 
    } else {
      const embed = new Discord.MessageEmbed()
  embed.setDescription(vid.title + ` has finished playing!`)
  embed.setFooter('Made with love by ' + 'TheSecretGunner#0001')
  message.channel.send(embed)
    }
  }
});

// Always remember to handle errors appropriately!
connections[message.guild.id].on('error', error => message.channel.send(':warning: Oops! Something went wrong on our end. Don\'t be scared. It was probably our fault...\n```' + error + '```'));
          } catch(err) {
message.channel.send(`:warning: Oops! Something went wrong on our end. Don't be scared. It was probably our fault...`)
         message.channel.send(`\`\`\`${err}\`\`\``)
          }  
     }
   }

if (message.content.toLowerCase() == "d2!clearqueue") {
  queue[message.guild.id] = []
  message.channel.send('Cleared Queue')
}

  if (message.content.toLowerCase() == "d2!np" || message.content.toLowerCase() == "d2!nowplaying") {
    const video = queue[message.guild.id][0].video
    const embed = new Discord.MessageEmbed()
    embed.setAuthor(video.title, 'https://i.ibb.co/XzMTygw/859459305152708630.gif')
  embed.setThumbnail(video.thumbnail)
  embed.setDescription(video.description)
  embed.addFields(
    [
      {
        name: "Duration",
        value: video.timestamp
      },
      {
        name: 'Queue Position', value: '`' +  `${queue[message.guild.id].length }`  + '`'
      }, 
      { name: 'Author', value: `[${video.author.name}](${video.author.url})`
      }
    ]
  )

let btn = new disbut.MessageButton()
  .setStyle('blurple') //default: blurple
  .setLabel('🟥') //default: NO_LABEL_PROVIDED
  .setID('stop') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
    let btn2 = new disbut.MessageButton()
  .setStyle('blurple') //default: blurple
  .setLabel('Queue') //default: NO_LABEL_PROVIDED
  .setID('queue') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
message.channel.send('Now playing...', { buttons: [
    btn, btn2
  ], embed: embed }).then(message => {
  message.react('🎤')
    message.react('🔁')
  }); 
  }
})

client.on('clickButton', async (button) => {
  if (button.id === 'stop') {
  const message = button;
    connections[message.guild.id].pause()
 await button.reply.send('Thanks for playing music! I will see you next time :smile:', true)
  return
  }

  if (button.id === 'queue') { 
  const message = button;
    if (queue[message.guild.id].length > 0) {
    const embed = new Discord.MessageEmbed
      embed.setTitle('Queue for ' + message.guild.name)
    var i = 0
    for (let queueitem of queue[message.guild.id]) {
      embed.addField(`(${i}): ${queueitem.video.title}`, queueitem.video.timestamp)
      var i = i+=1
    }

    await button.reply.send('Your queue has arrived...', { embed: embed }, true)
  } else {
    const embed = new Discord.MessageEmbed
      embed.setTitle('Queue for ' + message.guild.name)
    embed.setDescription(':warning: There is no queue')
     await button.reply.send({ embed: embed }, true)
  }
  }
});

   client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.emoji.name == '🔁') {
      if (reaction.message.author.id == "948411752935219272" && user.id == client.user.id) return; 
        reaction.message.channel.send('Loop is off :negative_squared_cross_mark: :repeat:')
      loop[reaction.message.guild.id] == "not on"
    }
   });

 client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.emoji.name == '🔁') {
       if (reaction.message.author.id == "948411752935219272" && user.id == client.user.id) return; 
          reaction.message.channel.send('Loop is on :repeat:')
      loop[reaction.message.guild.id] == "on"
    }
   if (reaction.emoji.name == '❌') {
      if (reaction.message.author.id == "948411752935219272" && user.id == client.user.id) return; 
   if (!queue[reaction.message.guild.id].length > 1) {
     reaction.message.channel.send(`<@${user.id}>, There is either no queue, or someone has already cleared it`)
   } else {
     queue[reaction.message.guild.id] = []
  reaction.message.channel.send(`<@${user.id}> cleared the queue!`)
   }
   }
   
 if (reaction.emoji.name == '🎤') {
   if (reaction.message.author.id == "948411752935219272" && user.id == client.user.id) return; 
   if (lyric[reaction.message.guild.id] == undefined) {
     lyricsbois = "Lyrics can't be found :warning:"
     embed = new Discord.MessageEmbed()
   embed.setTitle('Lyrics')
   embed.setDescription(lyricsbois)
   reaction.message.reply(embed)
   } else {
     if (lyric[reaction.message.guild.id].length > 4000) {
       const lyricsbois = 'The lyrics are over 4000 characters so we can\'t show them! Sorry :skull:'
        embed = new Discord.MessageEmbed()
   embed.setTitle('Lyrics')
   embed.setDescription(lyricsbois)
   reaction.message.reply(embed)
     } else {
       const lyricsbois = lyric[reaction.message.guild.id]
        embed = new Discord.MessageEmbed()
   embed.setTitle('Lyrics')
   embed.setDescription(lyricsbois)
   reaction.message.reply(embed)
     }
 }
 }
   
    })

client.login(process.env.TOKEN)
