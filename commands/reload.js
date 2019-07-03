const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = (bot, message, args) => {
 let owners = ['137624084572798976', '501710994293129216'];
  if(!owners.includes(message.author.id)){
    message.delete(50);
    message.reply('This is an owner only command')
  }

  let ucantdo = new Discord.RichEmbed()

  .setDescription("**This is an owner-only command.**")
  .setColor("RANDOM")


let notprovided = new Discord.RichEmbed()

.setDescription("Please provide a command name to reload!")
.setColor("#ff9d00")

let notthere = new Discord.RichEmbed()

.setDescription("That command does not exist!")
.setColor("#ff9d00")

  if(!args || args.size < 1) return message.channel.send('');
  const commandName = args[0];
  // Check if the command exists and is valid
  if(!bot.commands.has(commandName)) {
    return message.channel.send('That command does not exist!');
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the bot.commands Enmap
  bot.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  bot.commands.set(commandName, props);
  message.channel.send(`<:GreenTick:580716592980164618> File **${commandName}** re-loaded!`);
  
  let filereloaded = new Discord.RichEmbed()
  .setTitle('File Reloaded')
  .addField('File', commandName + '.js', true)
  .addField("Reloaded At", message.createdAt.toDateString(), true)
  .addField("Reloaded By", message.author.tag, true)
  .setTimestamp()

}

module.exports.help = {
  name: "reload",
};