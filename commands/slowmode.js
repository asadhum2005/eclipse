const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let count = args[0];
    let reason = args.join(" ").slice(count.length)
      if(!reason){
        reason = 'a reason was not provided'
      };


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

      message.channel.send(`Slowmoding **#${message.channel.name}**...`).then(async(msg) =>{
      await message.channel.setRateLimitPerUser(count, `Slowmode set to ${count} seconds. \n Responsible User: ${message.author.tag}`)
      await msg.edit(`Slowmode Set!`, embed);

    });
      } catch (err) {
        message.channel.send("There was an error.")
      };
    
    };
    

module.exports.help = {
    name: "slowmode",
};
