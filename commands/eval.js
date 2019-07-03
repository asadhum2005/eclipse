const Discord = require("discord.js");
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
  const code = args.join(" ");
  if (!config.owners.includes(message.author.id)) {
    message.delete();
    return message.reply('You are not allowed to use this command')
  };
  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

  try {

    let evaled = eval(code);

    if(!code) return message.channel.send("You need to provide code for me to eval!");

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

   
      message.channel.send(clean(evaled), {code:"xl"})
        
      const sucsess = new Discord.RichEmbed()

      .setTitle(`Eval Command Sucseeded!`)
      .setFooter(`Sucseeded by: ${message.author.username}#${message.author.discriminator} | ID: ${message.author.id}`)
      .setColor(config.color)
      .setDescription(`Code run: \n\`\`\`js\n${code}\n\`\`\``)
      message.channel.send(sucsess);
  } catch (err) {
    // EVAL ERROR LOG CHANNEL ID: 575604330195845149
    const errorEmbed = new Discord.RichEmbed()

    .setTitle(`Error whilst exicuting the following code:`)
    .setDescription(`\n \`\`\`js\n${code}\`\`\` \n  \`\`\`xl\n${clean(err)}\n\`\`\``)
    .setColor(config.red)
    .setFooter(`Error made by: ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
    .setTimestamp()

    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, errorEmbed);
  };
};


module.exports.help = {
  name: "eval",
};