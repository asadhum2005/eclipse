const Discord = require("discord.js");
const fs = require('file-system');
const chalk = require('chalk');
const keyv = require("keyv");
const db = new keyv("sqlite://./db.sqlite")
const moment = require('moment');
const express = require('express')
const bodyParser = require('body-parser')
global.client = new Discord.Client({
    disableEveryone: true,
});
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./cmds/${file}`);
	client.commands.set(command.name, command);
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.get('/teapot', (req, res) => {
	res.sendStatus(418);
});

app.get('/*', (req, res) => {
	res.sendStatus(404);
});

app.listen(3000, () => console.log(`Server Started`));

db.on('error', err => console.error('Keyv connection error:', err))


process.on('unhandledRejection', err => {
	console.error(err)
    client.channels.get('595885700839112724').send("", {
        embed: new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription(`\`\`\`xl\n${err}\n\`\`\``)
    });
});

client.on("ready", async() => {
	console.clear();
	client.user.setActivity("Beta Version")
	client.channels.get('595547701630992385').send("", {
		embed: new Discord.RichEmbed()
		.setTitle("Logged In!")
		.setTimestamp()
		.setColor("GREEN")
	})
	console.log('Logged In!')
})

client.on('message', async(message) => {
	let prefix = await db.get("prefix" + message.guild.id)
	if(!prefix) prefix = process.env.prefix;
	if(message.author.bot) return;
	if(message.channel.type == 'dm') return;
	if(!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	try {
		command.execute(client, message, args, db);
		} catch (error) {
			console.error(`[ERR - ${message.id}] : ${error}`);
			message.channel.send("", {
				embed: new Discord.RichEmbed()
				.setFooter("ERROR ID: " + message.id, client.user.avatarURL)
				.setColor("#da0000")
				.setAuthor(message.author.username, message.author.avatarURL)
				.setTitle("Error")
				.setDescription(`We're sorry, but there was an error!\n\nPlease, [report this issue](${process.env.supportServer})!`)
				.addField("> Error", error.length >= 1024 ? "The error was too long! It was logged with ID " + message.id : error)
			})
	};
});

client.login(process.env.token);