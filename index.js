const Discord = require("discord.js");
const config = require('./config.json');
const client = new Discord.Client({
    disableEveryone: true,
});

client.on('ready', async() =>{
    var a = client.generateInvite()
    console.log(' ')
    console.log(' Online ')
    console.log(' ')
    console.log('===========')
    console.log(' ')
    console.log(`
Client Information:

Username: ${client.user.username}
Discriminator: ${client.user.discriminator}
Invite URL: ${a}
Owner(s): ${config.owners}
Default Prefix: ${config.prefix}
Ready Timestamp: ${client.readyAt.toDateString()}

    `)
    console.log(' ')
    client.channels.get('595547701630992385').send(`
    **__Client Information__**:

    **Username**: ${client.user.username}
    **Discriminator**: ${client.user.discriminator}
    **Tag**: ${client.user.tag}
    **Invite URL**: ${a}
    **Owner(s)**: ${config.owners}
    **Default Prefix**: ${config.prefix}
    **Ready At**: ${client.readyAt.toDateString()}    
    **Ready At** (Raw): ${client.readyAt}
    **Ready Timestamp**: ${client.readyTimestamp}
    **Verified**: ${client.user.verified}
    **Guilds**: 
    ${client.guilds.map(g=>`${g.name} | ${g.id}`.toString()).join('\n')}
    
    `)

        
});
client.on('message', async(message) =>{
    // Ignore other bots and DMs
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    // Bot prefix and owners, etc...
    var prefix = config.prefix;
    var owners = config.owners;
    // Message Variables
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0].toLocaleLowerCase();
    const args = messageArray.slice(1);
    var hex = message.member.displayColor

    if (cmd === `${prefix}ping`){
        console.log(message.content) // doesnt even console log message content
        message.reply('Pinging...').then((msg) =>{
            msg.edit(`Pong! \`${Date.now() - message.createdTimestamp} MS\``)
        });                                                                      
    };
});

client.login(config.token);