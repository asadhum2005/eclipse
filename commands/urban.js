const Discord = require("discord.js");
const fetch = require('node-fetch');
const urban = require('relevant-urban');

module.exports.run = async(bot, message, args)=>{
    let word = args.join(' ');
    if(!word){
        return message.reply('Please include a word to serach.')
    }

    // if !word goes here {}{}{}}{}

    let res = await urban(word).catch(e=>message.channel.send(e));
    if(!res){
        return message.reply('I couldn\'t find that word.')
    }
    if (typeof res == 'undefined') {
        return message.reply('I cant find it')
    }
    let embed = new Discord.RichEmbed()
    .setTitle(res.word)
    .setURL(res.urbanURL)
    .setDescription(`${res.definition}`)
    .addField('Examples', res.example)
    .addField('Author', res.author)
    .addField('Rating', `Upvotes: ${res.thumbsUp}\nDownvotes: ${res.thumbsDown}\n\n[View Source](${res.urbanURL})`)
    .setColor("RANDOM")

    message.channel.send({ embed })
    .catch(err=>{
        message.reply(`I couldn\'t find the word(s) provided.\n${err}`)
    });
    
    // also res.examples
}

module.exports.help = {
    name: 'urban'
}