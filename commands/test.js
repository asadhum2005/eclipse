const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    message.channel.send('Hi')
}

module.exports.help = {
    name: 't'
}