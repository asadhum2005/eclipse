const Discord = require("discord.js")
module.exports = {
	name: 'getinv',
	aliases: ['getinvite', 'grabinv', 'grabinvite'],
	execute(client, message, args, db) {
		message.delete().catch((e) => {  })
		if(!['501710994293129216', '373900508026372097'].includes(message.author.id)) {
			return message.channel.send("Only bot admins can use this command!")
		} else {
			let guildid = args[0];
			if(!guildid) {
				return message.channel.send("You need to give a server ID!")
			} else {
				let guild = client.guilds.get(args[0]);
				if(!guild) {
					return message.channel.send("I'm not a member of that guild...")
				} else {
					guild.channels.random().createInvite()
						.then(async(inv) => {
							message.channel.send("", {
								embed: new Discord.RichEmbed()
								.setTitle(`Join ${guild.name}`)
								.setColor('RANDOM')
								.setURL(inv.url)
							})
						})
				};
			};
		}
	}
}