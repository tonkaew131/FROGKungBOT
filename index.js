const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
//const { KSoftAPIClient } = require('ksoft.js');
//const ksoft = new KSoftAPIClient(''); 
const ytdl = require('ytdl-core');
const prefix = "?";
const client = new Client({ disableEveryone: true });
const youtube = new YouTube("");
const {TeamTrees} = require('teamtrees-api');
const teamTrees = new TeamTrees({
    rateLimit: true,
    cache: {
      enable: true,
      duration: 5
    }
});
const queue = new Map();

const server = require('./server.js');

client.on('error', (err) => console.error(err));

//When someone add or remove Emoji
/*client.on("raw", event => {
  if(event.t=="MESSAGE_REACTION_ADD"||event.t=="MESSAGE_REACTION_REMOVE") {
  if(event.d.guild_id!="584608508297871370") return;
  if(event.d.message_id!="584999161800425503") return;
  let guild = client.guilds.get("584608508297871370");
  let member = guild.members.get(event.d.user_id);
  let KMUTNB = guild.roles.get("584670724141088798");
  let Developer = guild.roles.get("584631938099445761");
  if(event.t=="MESSAGE_REACTION_ADD") {
    if(event.d.emoji.name=="kmutnb") member.addRole(KMUTNB);
    if(event.d.emoji.name=="js") member.addRole(Developer);
  } 
  if(event.t=="MESSAGE_REACTION_REMOVE") {
    if(event.d.emoji.name=="kmutnb") member.removeRole(KMUTNB);
    if(event.d.emoji.name=="js") member.removeRole(Developer); 
  }
}
});*/

const de_input  = [" ","1","!","2","@","3","#","4","$","5","%","6","^","7","&","8","*","9","(","0",")","-","_","=","+","q","Q","w","W","e","E","r","R","t","T","y","Y","u","U","i","I","o","O","p","P","[","{","]","}","a","A","s","S","d","D","f","F","g","G","h","H","j","J","k","K","l","L",";",":","'","\"","z","Z","x","X","c","C","v","V","b","B","n","N","m","M",",","<",".",">","/","?","|"]
const de_output = [" ","ๅ","+","/","๑","-","๒","ภ","๓","ถ","๔","ุ", "ู", "ึ", "฿","ค","๕","ต","๖","จ","๗","ข","๘","ช","๙","ๆ","๐","ไ","\"","ำ","ฎ","พ","ฑ","ะ","ธ","ั","ํ","ี","๊","ร","ณ","น","ฯ","ย","ญ","บ","ฐ","ล",",","ฟ","ฤ","ห","ฆ","ก","ฏ","ด","โ","เ","ฌ","้","็","่","๋","า","ษ","ส","ศ","ว","ซ","ง",".","ผ","(","ป",")","แ","ฉ","อ","ฮ","ิ","ฺ","ื","์","ท","?","ม","ฒ","ใ","ฬ","ฝ","ฦ","ฃ","ฅ"]

client.on("raw", event => {
  if(event.t!="MESSAGE_REACTION_ADD") return;
  if(event.d.guild_id!="584608508297871370" && event.d.guild_id!="584711401025830942") return;
  if(event.d.emoji.name!="❓") return;
  if(event.d.user_id=="588613165114327071") return;
  let channel = client.channels.get(event.d.channel_id);
  let outpit = []
  let message = channel.fetchMessage(event.d.message_id).then(message => {
    let inpit = message.content.split("");
    inpit.forEach(t => {
      for ( var a = 0 ; a < de_input.length ; a++ ) {
        if ( de_input[a] == t ) {
          outpit.push(de_output[a]);
        }
      }
    })
    if(outpit.length==0) return;
    channel.send(outpit.join(""))
  });
  
});

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds. Ready at ${client.readyAt.toLocaleString("en-US", {timeZone: "Asia/Bangkok",hour12: false,weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})}`); 
  client.user.setActivity('🤔 !help', { type: 'LISTENING' });
  client.guilds.forEach(guild => {
    console.log(" - " + guild.name);
  })
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity('🤔 !help', { type: 'LISTENING' });
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity('🤔 !help', { type: 'LISTENING' });
});

/*client.on("guildMemberAdd", (member) => {
  if(member.guild.id!=584608508297871370){
     return;
  }
  member.guild.channels.get("584616564184317992").send(`👋**ยินดีต้อนรับ** ${member.user} สู่ห้อง **${member.guild.name}** นะคร้าบบบบ👋\n--*กรุณาอ่านกฎก่อนแชทหรือทำการใดๆ ที่* <#584636034290155521>--`);
});

client.on("guildMemberRemove", function(member){
  if(member.guild.id!=584608508297871370){
     return;
  }
  member.guild.fetchBan(member.user).then(baninfo => {
      if(baninfo.reason==null){
        client.channels.get("584616564184317992").send("***"+baninfo.user.tag+"*** *โดนแบนจากเซิฟเวอร์ไปแล้ววว* 😞😞");
        return;
      }
      client.channels.get("584616564184317992").send("***"+baninfo.user.tag+"*** โดนแบนจากเซิฟเวอร์เนื่องจาก `"+baninfo.reason+"`");
      return;
  }).catch(baninfo => {
    client.channels.get("584616564184317992").send(`***${member.user.tag}*** *ได้ออกจากห้องไปแล้ววว* 😞😞`);
    return;
  });
});*/

client.on('message', async message => {
  if(message.author.bot) return; //bot don't repeate itself!!
  if(message.content.indexOf(prefix)!==0) return; //bot run with prefix!!
  if(message.channel.id!="584645970772361229"&&message.channel.id!="600316093872996382") return; //bot always run in bot-channel!!
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  const argss = message.content.split(' ');
	const searchString = argss.slice(1).join(' ');
	const url = argss[1] ? argss[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);
  
  if(command=="trees"){
    teamTrees.getTotalTrees(true).then(num => {
      const embed = new Discord.RichEmbed()
        .setColor('#477F45')
        .setAuthor('TeamTrees.org', 'https://cdn.discordapp.com/attachments/523871005962272769/640588975664267285/icon-badge-branch-2.png', 'https://teamtrees.org')
        .setThumbnail('https://cdn.discordapp.com/attachments/523871005962272769/640589520705814558/icon-badge-leaf-2.png')
        .addField('Total Trees planted', num + ' trees')
        .setFooter('Requested by ' + message.author.username, message.author.avatarURL)
        .setTimestamp(message.createdAt)
      message.channel.send(embed);
    }).catch(console.error);
  }
  
  if (command=="ranks") {
    if(args[0]!=undefined)return;
		let KMUTNB = message.guild.roles.get('584670724141088798').members.size;
		let Developer = message.guild.roles.get('584631938099445761').members.size;
    let nsfw = message.guild.roles.get('590094087148011550').members.size;
		const textkmutnb = '`KMUTNB ';
		const textdeveloper = '`Developer ';
    const textnsfw = '`ผู้ทรงภูมิปัญญา ';
		const textmembers = ' members`\n';
    const authorusername = message.author.username;
		const texttoembed = textkmutnb.concat(KMUTNB,textmembers,textdeveloper,Developer,textmembers, textnsfw, nsfw, textmembers);
    var embed = new Discord.RichEmbed()
			.setTitle('**Ranks**')
      .setColor('#154897')
      .setDescription(texttoembed)
			.setFooter("Use the !rank command to join a rank")
		message.channel.send(embed);
  }
  
  if (command=="rank") {
    let KMUTNB = message.guild.roles.get('584670724141088798');
    let Developer = message.guild.roles.get('584631938099445761');
    let nsfw = message.guild.roles.get('590094087148011550');
			
    if(args[0]==undefined){
      var embed = new Discord.RichEmbed()
				.setTitle('**Command: !rank**')
				.setColor('#154897')
				.setDescription('**Description:** Join/leave a rank\n**Usage:** !rank [rank name]\n**Example:** !rank KMUTNB')
			message.channel.send(embed);
			return;
    }
    
    if(args[0]=="KMUTNB"){
      if(message.member.roles.has(KMUTNB.id)){
					message.member.removeRole(KMUTNB).catch(console.error);
					message.channel.send(message.author+", you leaved **KMUTNB**");
					return;
      }
      message.member.addRole(KMUTNB).catch(console.error);
      message.channel.send(message.author+", you joined **KMUTNB**");
      return;
			}
    if(args[0]=="Developer"){
			if(message.member.roles.has(Developer.id)){
					message.member.removeRole(Developer).catch(console.error);
					message.channel.send(message.author+", you leaved **Developer**");
					return;
      }
      message.member.addRole(Developer).catch(console.error);
      message.channel.send(message.author+", you joined **Developer**");
      return;
    }
    message.channel.send("🚫 That rank doesnt exist.");
  }
  
  if(command=="warp"){
  if(args[0]==undefined){
    message.channel.send("**--Warp help command--**\n`!warp [url] [true(optional) : for showing who is sender]`");
    return;
  }
   if(message.member.roles.find(r => r.id == "590094087148011550")){
    if(args[1]=="true"){
      message.delete();
    client.channels.get("584999828359086090").send("**WARP\n**"+args[0]+" was send by "+message.author);
    return;
    }
    message.delete();
    client.channels.get("584999828359086090").send("**WARP\n**"+args[0]);
   return;
   } else {
    message.channel.send("You don't have role to send **warp**");
  }
  }
  
  if(command=="emotes"||command=="emojis"){
    if(args[0]!=undefined)return;
    const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
    var counter = message.guild.emojis.filter(e => e.animated == false).size+"/50 Emotes, "+message.guild.emojis.filter(e => e.animated == true).size+"/50 Animated"
    var embed = new Discord.RichEmbed()
    .setTitle(counter)
    .setDescription(emojiList)
    .setColor('#154897')
    message.channel.send(embed);
  }
  
  if (command=="help") {
    if(args[0]=="music"){
      const embed = new Discord.RichEmbed()
			.setColor('#154897')
			.setTitle('**Help**')
			.setDescription("---***Music commands***--- \n►**play** : Plays a song with the given name or url\n►**skip** : Skips the currently playing song\n►**stop** : stop the currently playing song\n►**volume** : Check or change the current volume\n►**np** : Shows what song the bot is currently playing\n►**queue** : View the queue\n►**pause** : Pauses the currently playing track\n►**resume** : Resume paused music")
    message.channel.send(embed);
    } if(args[0]==undefined) {
    const embed = new Discord.RichEmbed()
			.setColor('#154897')
			.setTitle('**Help**')
			.setDescription("---***Commands***--- \n►**help** : For guide to how to use bot\n►**help music** : For guide to playing music\n►**rank** : For assign yourself a role\n►**ranks** : Lists of joinable roles\n►**ping** : For seeing lagency from Bot\n►**avatar** : To see people's avatar\n►**serverinfo** : Get server info\n►**whois** : Get user information\n►**emotes** : List all emojis in this server\n►**warp** : IDK\n►**trees** : check trees") //Get server info/stats
    message.channel.send("The prefix for "+ message.guild.name +" is `!`");
    message.channel.send(embed);
    }
}
  
  if(command=="serverinfo"){
    if(args[0]!=undefined)return;
    const embed = new Discord.RichEmbed()
			.setColor('#FFC85E')
			.setAuthor(message.guild.name, message.guild.iconURL)
      .addField('Owner', message.guild.owner.user.tag  , true)
      .addField('Region', message.guild.region , true)
      .addField('Channel Categories', message.guild.channels.filter(c => c.type === 'category').size, true)
			.addField('Text Channels', message.guild.channels.filter(c => c.type === 'text').size  , true)
      .addField('Voice Channels', message.guild.channels.filter(c => c.type === 'voice').size , true) 
      .addField('Members', message.guild.members.size, true)
      .addField('Humans', message.guild.members.filter(m => m.user.bot == false).size  , true)
      .addField('Bots', message.guild.members.filter(m => m.user.bot == true).size , true) 
      .addField('Online', message.guild.members.filter(m => m.presence.status === 'online' || m.presence.status === 'idle' || m.presence.status === 'dnd').size-1, true)
      .addField('Roles', message.guild.roles.size)
      .addField('Role List', message.guild.roles.array().join(', '))
      .setFooter('ID: 584608508297871370 | Server Created')
      .setTimestamp('06/02/2019')
    message.channel.send(embed);
  }
  
  if (command=="avatar") {
			var id = message.mentions.users.first();
			if(args[0]==undefined){
				let embed = new Discord.RichEmbed()
				.setImage(message.author.avatarURL)
				.setColor('#154897')
				message.channel.send(embed);
				return;
			}
			if(!id){
				message.channel.send("🚫 Couldn't find that user.");
				return;
			}
			let embed = new Discord.RichEmbed()
				.setImage(id.avatarURL)
				.setColor('#154897')
			message.channel.send(embed);
  }
  
  if (command=="ping") {
    if(args[0]!=undefined)return;
    const commandtext = 'Command ran by: ';
    const authorusername = message.author.username;

    const useruser = commandtext.concat(authorusername);
    const userurl = message.author.avavtarURL;

    var embed = new Discord.RichEmbed()
      .setColor('#4F535C')
      .setDescription(`Loading...`)
      .setTimestamp(message.createdAt)
    message.channel.send(embed).then(message => {
      embed.setColor('#154897')
      embed.setDescription(`:ping_pong: Pong! **\`${client.pings[0]}ms\`**`)
      embed.setFooter(useruser, userurl)
      embed.setTimestamp(message.createdAt)
    message.edit(embed)
    })
  }
    
  if (command=="whois"){
    var user = message.mentions.users.first() || message.author;
    if(args[0]!=undefined&&message.mentions.users.first()!=message.author&&args[0]!=message.mentions.users.first()){
      message.channel.send("🚫 Couldn't find that user.");
      return;
    }   
    var member = message.guild.member(user);
    var rolecount = "Roles ["+((member.roles.array().length)-1)+"]";
    var embed = new Discord.RichEmbed()
      .setAuthor(user.tag, user.displayAvatarURL)
			.setThumbnail(user.displayAvatarURL)
			.setDescription(user)
      .addField('Status', user.presence.status, true)
      .addField('Joined', member.joinedAt.toLocaleString("en-US", {timeZone: "Asia/Bangkok",hour12: false,weekday:"short",day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"numeric"}) , true) //member.joinedat
      .addField('Join Position', getJoinRank(user.id, message.guild), true)
			.addField('Registered', user.createdAt.toLocaleString("en-US", {timeZone: "Asia/Bangkok",hour12: false,weekday:"short",day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"numeric"}), true) //message.author.createdAt
      .addField(rolecount, member.roles.array().slice(1).join(' ')||'None')
      //.addField('Key Permissions', member.permissions.toArray().join(', ')||'None') //.filter(p => p == true).array().join(', ')
      .setColor('#154897')
      .setTimestamp(message.createdAt)
      .setFooter('ID: '+user.id) //.permissions
    message.channel.sendEmbed(embed)
    //console.log(member.permissions.toArray());
  }
  
  if (command === 'play'||command === 'p') {
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
	} 
  
  else if (command === 'skip'||command === 's') {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} 
  
  else if (command === 'stop') {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
    message.channel.send("❌ Stop command has been used!");
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
    return undefined;
	} 
  
  else if (command === 'volume') {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return message.channel.send(`I set the volume to: **${args[1]}**`);
	} 
  
  else if (command === 'np') {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} 
  
  /*else if (command === 'ly') {
    message.channel.send("เจ้ง");
  }
  else if (command === 'ly') {
    if (args[0]!=undefined) { //custom search //
      var name = message.content.slice(4);
      message.channel.send("🔍 **Searching lyrics for**  `"+name+"`").then((msg)=>{
        ksoft.lyrics.search(name, { textOnly: false ,limit: 1}).then(Dat => {
          var check = Dat.data[0].lyrics || 'error'; 
          if(check=='error'){
            var namee = Dat.data[0].artist+" - "+Dat.data[0].name || name;
            msg.edit("❌ C**ould not find lyrics for**  `"+namee+"`").catch(console.error);
            return;
          }
        var chunkk = chunkSubstr(check , 2047) , x;
        //console.log(chunkk);
        var text = "Requested by " + message.author;
        for(x in chunkk){
          const Embed = new Discord.RichEmbed()
	          .setColor('#0099ff')
	          .setDescription(chunkk[x])
	          .setFooter("Requested by " + message.author.username + " | Lyrics provided by KSoft", message.author.displayAvatarURL);
          message.channel.send(Embed);
        }
        }).catch(console.error);
      });
      
      return;
    } //custom search
    if (serverQueue && serverQueue.playing) {
      message.channel.send("🔍 **Searching lyrics for**  `"+serverQueue.songs[0].title+"`").then((msg)=>{
        ksoft.lyrics.search(serverQueue.songs[0].title, { textOnly: false ,limit: 1}).then(Dat => {
          var check = Dat.data[0].lyrics || 'error'; 
          if(check=='error'){
            msg.edit("❌ C**ould not find lyrics for**  `"+serverQueue.songs[0].title+"`").catch(console.error);
            return;
          }
        var chunkk = chunkSubstr(check , 2047) , x;
        //console.log(chunkk);
        var text = "Requested by " + message.author;
        for(x in chunkk){
          const Embed = new Discord.RichEmbed()
	          .setColor('#0099ff')
	          .setDescription(chunkk[x])
	          .setFooter("Requested by " + message.author.username + " | Lyrics provided by KSoft", message.author.displayAvatarURL);
          message.channel.send(Embed);
        }
        }).catch(console.error);
      });
      
			return;
		} //np seacrh
    if(args[0]==undefined){
      message.channel.send("**--lyrics help command--**\n`!ly [song-name]`");
      return;
    } //help command
    
  }*/
  
  else if (command === 'queue'||command === 'q') {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
    let index = 0;
		return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
		`);
	} 
  
  else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Paused the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	} 
  
  else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Resumed the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	}
  
	return undefined;

});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	//console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	//console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}

function getJoinRank(ID, guild) { // Call it with the ID of the user and the guild
  if (!guild.member(ID)) return; // It will return undefined if the ID is not valid

  let arr = guild.members.array(); // Create an array with every member
  arr.sort((a, b) => a.joinedAt - b.joinedAt); // Sort them by join date

  for (let i = 0; i < arr.length; i++) { // Loop though every element
    if (arr[i].id == ID){
      if(i==0) return 1;
      return i;
    } // When you find the user, return it's position
  }
}

function chunkSubstr(str, size) {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}

client.login("").catch(console.error);
