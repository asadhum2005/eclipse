const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

      let embed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(message.author.avatarURL)
      .addField("Username ", `${message.author.tag} (ID: ${message.author.id})`)
      .addField("Status", message.member.presence !== null && message.member.presence.status !== null ? message.member.presence.status : "Offline", true)
      .addField("Playing ", `${message.author.presence.game === null ? "None" :  message.author.presence.game.name}`, true)
      .addField("Nickname ", `${message.member.displayName}`, true)
      .addField("Highest Role ", message.member.highestRole.name, true)
      .addField("Joined Server At ", `${message.member.joinedAt.toDateString()}`, true)
      .addField("Joined Discord At ", `${message.author.createdAt.toDateString()}`, true)
      .addField("Role(s) ", `${message.member.roles.map(r => r.name).join(", ")}`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL);
    if (message.mentions.users.size < 1) return message.channel.send(embed2);
      
    let member = message.mentions.members.first();
    let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(member.user.avatarURL)
      .addField("Username ", `${member.user.tag} (ID: ${member.id})`)
      .addField("Status", member.presence !== null && member.presence.status !== null ? member.presence.status : "Offline", true)
      .addField("Playing ", `${member.user.presence.game === null ? "Nothing" :  member.user.presence.game.name}`, true)
      .addField("Nickname ", `${member.nickname === null ? "None" : member.nickname}`, true)
      .addField("Highest Role ", member.highestRole.name, true)
      .addField("Joined Guild At ", `${member.joinedAt.toDateString()}`, true)
      .addField("Joined Discord At ", `${member.user.createdAt.toDateString()}`, true)
      .addField("Role(s) ", `${member.roles.map(r => r.name).join(", ")}`)
      .setTimestamp()
      .setFooter(member.user.username, member.user.avatarURL);


      message.channel.send({ embed })
      let used = new Discord.RichEmbed()
      .setAuthor(`Command Used:`, bot.user.avatarURL)
      .setColor(`#81868e`)
      .setDescription(`/whois used in ${message.guild.name} (${message.guild.id}) \n ${message.author.username}#${message.author.discriminator}, ${message.author.id}`)
      bot.channels.get("575619138576318484").send(used)

    }


module.exports.help = {
    name: "userinfo"
  }
