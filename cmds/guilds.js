module.exports = {
	name: 'guilds',
	aliases: [],
	execute(client, message, args, db6) {
				if(!['501710994293129216', '373900508026372097'].includes(message.author.id)) {
					return message.reply("nope")
				} else {
					return message.author.send(client.guilds.map(x => `${x.name} | ${x.id}`.toString()).join("\n"), { split: true })
				}
	}
}