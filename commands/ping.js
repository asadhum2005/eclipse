const Discord = require("discord.js");
const snekfetch = require('snekfetch')
const fs = require("fs")

exports.run = async (bot, message, args) => {
  let ping = Math.round(message.client.ping); 
  const ping1 = new Discord.RichEmbed()
  .setDescription(`:ping_pong: Please wait! It wont take long :) \n if you see this message its probs not a good thing`)
  .setColor("RANDOM");
  message.channel.send({embed: ping1}).then((msg) => {
  const ping2 = new Discord.RichEmbed()
  .addField('__**API:**__', `**${ping} MS**`, true)
  .addField('__**Ping:**__', `**${msg.createdTimestamp - message.createdTimestamp} MS**`, true)
  .setColor('RANDOM')
  .setTimestamp()
  .setFooter('Bot Ping', bot.user.avatarURL)
  msg.edit(ping2)
    });
      let used = new Discord.RichEmbed()
      .setAuthor(`Command Used:`, bot.user.avatarURL)
      .setColor(`#81868e`)
      .setDescription(`/ping used in ${message.guild.name} (${message.guild.id}) \n ${message.author.username}#${message.author.discriminator}, ${message.author.id}`)
      bot.channels.get("575619138576318484").send(used)
};


module.exports.help = {
    name: "ping",
  };