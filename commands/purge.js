const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

        // get the delete count, as an actual number.
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`you may not use this command!`);       
        const deleteCount = parseInt(args[0], 10);
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
          return message.reply('I need the manage messages permission for this command to work!')
        }
        if(!deleteCount) return message.channel.send({embed: usage})

        // Ooooh nice, combined conditions. <3
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply(" ❌ **ERROR:** Please provide a number between 2 and 500 for the number of messages to delete");
        
        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(` ❌ **ERROR:** Couldn't delete messages because of: ${error}`));
            await message.channel.send(`Deleted ${deleteCount} messages!`).then((a)=>{
              a.delete(3000)
                        });
  
}

module.exports.help = {
  name: "purge"
}
