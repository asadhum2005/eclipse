const Discord = require("discord.js");
const fs = require('file-system');
const config = require('./config.json');
const chalk = require('chalk');
const moment = require('moment');
const client = new Discord.Client({
    disableEveryone: true,
});
client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(chalk.cyan(`${f} loaded!`));
      client.commands.set(props.help.name, props);
    });
  });

process.on('unhandledRejection', err =>{
    client.channels.get('595885700839112724').send("", {
        embed: new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription(`\`\`\`js\n${err}\n\`\`\``)
        .setColor(config.color)
    });
});

client.on('ready', async() =>{
    client.user.setActivity("LOADING STATUS.........")
    //Ready Console Message
    const timestamp = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
    let startEmbed = new Discord.RichEmbed()
    .setTitle(`${client.user.username} Started!`)
    .setColor("#53f23e")
    .addField("__**Time:**__", `${timestamp}`, true)
    .addField("__**Total Members:**__", `${client.guilds.reduce((p, c) => p + c.memberCount, 0)}`, true)
    .addField("__**Total Guilds:**__", `${client.guilds.size}`, true)
    .addField("__**Total Channels:**__", `${client.channels.size}`, true)
    client.channels.get("595547701630992385").send(startEmbed);
    fs.readdir("./commands/", (err, files) => {

        if(err) console.log(err);
        let j = files.filter(f => f.split(".").pop() === "js");
        client.channels.get('595888769450770452').send(`
        Loaded **${j.length}** commands sucsessfully
            `)  
    });
    
    var a = client.generateInvite()
    console.log(`${client.user.tag} is online`)
    console.log(' ')
    console.log('==========')

    client.user.setActivity(`?help | ${client.users.size} users in ${client.guilds.size} servers!`, { type: "STREAMING", url: "https://www.twitch.tv/smoething" })

});
client.on('message', async(message) =>{

    // Ignore other bots and DMs
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    // Bot prefix and owners, etc...
    var prefix = config.prefix;
    var owners = config.owners;
    const client_id = client.user.id;
    // Message Variables
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0].toLocaleLowerCase();
    const args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
    var hex = message.member.displayColor
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
 /*   if (cmd === `${prefix}ping`){
        console.log(message.content) // doesnt even console log message content
        message.reply('Pinging...').then((msg) =>{
            msg.edit(`Pong! \`${Date.now() - message.createdTimestamp} MS\``)
        });                                                                      
    }; */
    if (cmd === `${prefix}client.inf`) {
        message.channel.send(`
        **__Client Information__**:

        **Username**: ${client.user.username}
        **Discriminator**: ${client.user.discriminator}
        **ID**: ${client.user.id}
        **Tag**: ${client.user.tag}
        **Owner(s)**: ${config.owners}
        **Default Prefix**: ${config.prefix}
        **Ready At**: ${client.readyAt.toDateString()}    
        **Ready At** (Raw): ${client.readyAt}
        **Ready Timestamp**: ${client.readyTimestamp}
        **Verified**: ${client.user.verified}
        **Guilds**: 
    
        ${client.guilds.map(g=>`${g.name} | ${g.id}`.toString()).join('\n')}    
        `)
    
    };

    if (cmd === `${prefix}inv`) {
        client.generateInvite().then(inv=>{
            message.channel.send(`**Invite Me! ${inv}**`)
        });
    };

    if (cmd === `${prefix}blacklist`) {
        let blacklisted = [`${client.user.id}`, '0000000000'];
        let toBlacklist = args[0];
            if (message.mentions.members.first()) {
                toBlacklist = message.mentions.members.first().user.id;
            }
        blacklisted.push(toBlacklist);
        return message.channel.send('Array Value: **' + blacklisted + '**')
    };
});

client.login(config.token);