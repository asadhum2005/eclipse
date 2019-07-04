const Discord = require('discord.js');
const fetch = require('node-fetch');
const qs = require('querystring')

module.exports.run = async(client, message, args) =>{

    const queryString = args.join(" ")
    const res = await fetch(`https://djsdocs.sorta.moe/main/stable/embed?q=${queryString}`);
    const embed = await res.json();
    
    if(!queryString){
       await message.delete()
            .catch(err=>{});
        const filter = m => m.author.id === message.author.id;
        message.reply(`What would you like to search the Discord.js Docs? Expires in 10 seconds.\n\nType \`cancel\` to cancel!`).then(msg=>{
            msg.delete(10000)
        })
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 10000,
        }).then(async(collected)=>{
            if (collected.first().content.toLowerCase() == 'cancel') {
                return message.reply('<:greentick:596293276881911849> Command cancelled')
            }
            const queryString = collected.first().content;
            const res = await fetch(`https://djsdocs.sorta.moe/main/stable/embed?q=${queryString}`);
            const info = await res.json();
           
            if (!info || !res) {
                message.reply('<:redtick:596293277313925120> I can\'t fint the requiested information on the Discord.js Documentation!')
            }
             await message.channel.send({ embed: info})
        }).catch(() => {
            message.channel.send('<:redtick:596293277313925120> You took too long! Goodbye!');
          });
        return;
    };
    if (!embed) {
        return message.reply(`<:redtick:596293277313925120> ${client.user.username} **couldn't** find the requested information.\nMaybe look for something that actually exists next time?`);
    };

    await message.channel.send({ embed });
          //  >docs client
};

module.exports.help = {
    name: 'docs',
};