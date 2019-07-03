const Discord = require("discord.js");
const config = require('../config.json');

module.exports.run = async(client, message, args) =>{
    let cmds  = new Discord.RichEmbed()
    .setTitle("Help")
    .setDescription('Will be completed soon!')
    message.channel.send("", {
        embed: new Discord.RichEmbed()
        .setColor(message.member.displayColor)
        .setTitle('Commands')
        .setDescription(`
**?help** - shows this message
**?f [thing to f for]**
**?8ball [question]** - Ask the bot a question and get it to respond with an answer
**?serverinfo** - Display some basic server information
**?userinfo @user** - See a user's basic information. If no user is mentioned then it will display the message author's userinfo
      `)
      .addField("Support", `**[Support Server](${config.supportServer})**`)
    });
};

module.exports.help = {
    name: 'help',
};