
  const Discord = require("discord.js");
  
module.exports.run = async (client, message, args) => {

    coder = "sad (Eclipse)#3728";
    current = "**sad (Eclipse)#3728** is my current owner!";
    ron = "main.js";


    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL)
    .addField("Bot Name", client.user.username, true)
    .addField("Owner", 'sad (Eclipse)#3728 & Dan | DanBot Founder#2815', true)
    .addField("Memory Used", `**${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB USED**`, true)
    .addField("Created On", client.user.createdAt.toDateString(), true)
    .addField("Discord.js Version", require('discord.js').version.toString(), true)
    .addField("Servers", client.guilds.size, true)
    .addField('Voice Connections:', `**${client.voiceConnections.size}**`, true)
    .setTimestamp()
    message.channel.send({ botembed });
};

module.exports.help = {
  name: "botinfo",
};
