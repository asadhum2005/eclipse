const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let member = message.mentions.members.first();
    let nick = args.join(" ").slice(22);
    message.guild.members.get(member.user.id).setNickname(nick);
    let nickEmbed = new Discord.RichEmbed()

    .setAuthor(`Changed ${member.user.tag}'s Nicknme to: ${nick}`, member.user.avatarURL)
    .setColor("#42dff4")
    .setFooter(`Make sure the nickname is 32 or fewer characters in length`, message.author.avatarURL)
        message.channel.send(nickEmbed);


    const used = new Discord.RichEmbed()
    .setAuthor(`Command Used`, bot.user.avatarURL)
    .setTimestamp()
    .setDescription(`/set-nick used in ${message.guild.name + " in " + message.guild.id}! \n ${message.author.username + "#" + message.author.discriminator} | ${message.author.id}`)

    bot.channels.get("575619138576318484").send(used)
    
}

module.exports.help = {
    name: "set-nick"
}