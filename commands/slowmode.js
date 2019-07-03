const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let count = args[0];
    let reason = args.join(" ").slice(count.length)
      if(!reason){
        reason = 'a reason was not provided'
      };

    let ayesss = message.guild.emojis.find(emoji =>emoji.name === "ayes")
    let l = message.guild.emojis.find(emoji =>emoji.name === "loading")

    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      };
      if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.reply(`You need the Manage Messages permission to use this command!`)
      }



      const slowmodeSetLogEmbed = new Discord.RichEmbed()
      .setTitle(`Action: Slowmode -> #${message.channel.name}`)
      .setColor("#bfed28")
      .addField("Responsible User", message.author.tag, true)
      .addField('Channel', message.channel, true)
      .addField("Slowmode At", message.createdAt.toDateString(), true)
      .addField("Seconds", count, true)
      .setFooter(`Channel ID: ${message.channel.id}`, message.author.avatarURL)
      .setTimestamp()

      var embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setFooter(`Normal users are now able to send one message once every ${count} second(s)`, message.author.avatarURL)
      .setDescription(`**Slowmode Set:** ${count} second(s)\n**Reason**: ${reason}`)
      .setTimestamp()
      try {

      message.channel.send(`${l} Slowmoding **#${message.channel.name}**...`).then(async(msg) =>{
      await message.channel.setRateLimitPerUser(count, `Slowmode set to ${count} seconds. \n Responsible User: ${message.author.tag}`)
      let logsChannel = message.guild.channels.find(channel => channel.name === "logs")
      logsChannel.send(slowmodeSetLogEmbed)
      await msg.edit(`${ayesss} **Done!**`, embed);

    });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      };
    
      let used = new Discord.RichEmbed()
      .setAuthor(`Command Used:`, bot.user.avatarURL)
      .setColor(`#81868e`)
      .setDescription(`/slowmode used in ${message.guild.name} (${message.guild.id}) \n ${message.author.username}#${message.author.discriminator}, ${message.author.id}`)
      bot.channels.get("575619138576318484").send(used)
    };
    

module.exports.help = {
    name: "slowmode",
};
