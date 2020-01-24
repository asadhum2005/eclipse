const Discord = require("discord.js")

module.exports = {
	name: 'uptime',
	aliases: [],
async	execute(client, message, args, db)  {
			let upt = await message.channel.send("Calculating...")
	var getUptime = function(millis) {
    var dur = {};
    var units = [{
            label: "milliseconds",
            mod: 1000
        },
        {
            label: "seconds",
            mod: 60
        },
        {
            label: "minutes",
            mod: 60
        },
        {
            label: "hours",
            mod: 24
        },
        {
            label: "days",
            mod: 31
        }
    ];

    units.forEach(function(u) {
        millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
    });

    var nonZero = function(u) {
        return dur[u.label];
    };
    dur.toString = function() {
        return units
            .reverse()
            .filter(nonZero)
            .map(function(u) {
                return dur[u.label] + " " + (dur[u.label] == 1 ? u.label.slice(0, -1) : u.label);
            })
            .join(', ');
    };
    return (dur);
};
let myDate = new Date(client.readyTimestamp);
        var uptEmb = new Discord.RichEmbed()
        .addField("Uptime:", `**${getUptime(client.uptime)}**`)
        .setFooter(`Ready Timestamp: `)
				.setTimestamp(client.readyTimestamp)
        .setColor('RANDOM')
        upt.edit("",{embed: uptEmb})
					.catch(err=>{
						message.channel.send("", {
							embed: new Discord.RichEmbed()
							.setDescription('ERROR: ' + err)
							.setFooter('Please contact support by using the command >support')
						})
					});
	}
}