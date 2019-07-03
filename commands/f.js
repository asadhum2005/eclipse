const Disord = require("discord.js");

module.exports.run = async(bot, message, args) =>{
    let ffor = args.join(' ');
    if (!ffor) {
        return message.reply(`
        Incorrect Usage.
        You must say what you want to give an f for. Example:
        \`/f everyone\`
        `)
    }
    message.channel.send(`${message.author} has given an **F** for: **${ffor}**`)
};

module.exports.help = {
    name: 'f'
}