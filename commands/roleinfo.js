const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  let norole = new Discord.RichEmbed()
  .setDescription("❌ Role not found!")
  .setColor("#ff0000")

  let roletocheck = args[0]
  let role = client.guilds.get(message.guild.id).roles.find(r=>r.name===roletocheck);
  if (!role) return message.channel.send('That role does not exist')
    const embed = new Discord.RichEmbed()

    .setColor("RANDOM")
    .setTitle(`Role Information | ${args[0]}`)
    .addField('Role name', `${role.name}`, true)
    .addField('Role ID', `${role.id}`, true)
    .addField('Created At', role.createdAt.toDateString(), true)
    .addField("Mentionable: ", role.mentionable ? 'Yes' : 'No', true)
    .addField('Key Permissions', role.permissions, true)

    message.channel.send(embed);
    

}

module.exports.help = {
  name: "roleinfo"
}
