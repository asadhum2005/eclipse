const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async(client, message, args) =>{
    if(!config.owners.includes(message.author.id)) {
        return message.channel.send("You Can not use this command!")
    };
    message.delete();
    message.channel.send("", {
        embed: new Discord.RichEmbed()
        .setDescription(args.join(' '))
        .setColor('RANDOM')
    });
};

module.exports.help = {
    name: 'say'
};