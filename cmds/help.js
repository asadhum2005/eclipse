const Discord = require('discord.js')
const rm = require('discord.js-reaction-menu')
total = 3
module.exports = {
	name: 'help',
	aliases: ['helpme', 'support'],
async	execute(client, message, args, db) {
		let cmds = new Discord.RichEmbed()
		.setTitle('Commands')
		.setFooter("Made with 💖 by static#6419", client.users.get('501710994293129216').avatarURL)
		.setAuthor(`Eclipse Help`, client.user.avatarURL)
		.setDescription(`**Page 1/${total}**`)
		.setColor('RANDOM')
		.addField("FUN", `
\`?ping\` | Bot Latency
\`?meme\` | Get the bot to send a random meme
		`)

		let modCmds = new Discord.RichEmbed()
		.setFooter("Made with 💖 by static#6419", client.users.get('501710994293129216').avatarURL)
		.setTitle('Commands')
		.setAuthor(`Eclipse Help`, client.user.avatarURL)
		.setDescription(`**Page 2/${total}**`)
		.addField("Mod Commands", `
\`?slowmode [number of seconds]\` | Set the channel slowmode **TO BE ADDED**		
		`)

		let dev = new Discord.RichEmbed()
		.setTitle('Commands')
		.setAuthor(`Eclipse Help`, client.user.avatarURL)
		.setDescription(`**Page 3/${total}**\n\n**NOTE:** *These commands are only available to or developers!*`)
		.addField(`Dev Commands`, `
\`?guilds\` | Get a list of servers that the bot is in with their corresponding ID.
\`?getinv [guild id]\` | Get an invite to the server provided; the bot must a) be a member of that server and b) have permission to create invites 
		`)

		.setFooter("Made with 💖 by static#6419", client.users.get('501710994293129216').avatarURL)
	 new rm.menu(message.channel, message.author.id, [cmds, modCmds, dev], 120000)
	},
}