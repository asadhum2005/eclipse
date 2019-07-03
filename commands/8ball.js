const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

//    if(args[0]) return message.channel.send("What question should I answer?")
    let question = message.content.split(' ').slice(1).join(' ');
const answers = [
    'As I See It Yes',
    'Ask Again Later',
    'Better Not Tell You Now',
    'Cannot Predict Now',
    'Concentrate and Ask Again',
    'Don\'t Count On It',
    'It Is Certain',
    'It Is Decidely So',
    'Most Likely',
    'My Reply Is No',
    'My Sources Say No',
    'Outlook Good',
    'Outlook Not So Good',
    'Signs Point to Yes',
    'Very Doubtful',
    'Without A Doubt',
    'Yes',
    'Yes - Definitely',
    'No - Definitely not!',
    'HELL YEAH!',
    ':face_palm: ask meh later'
];

    let noquestioin = new Discord.RichEmbed()

        .setDescription("Please provide a question!")
        .setColor("RANDOM");

if (!question) {
    return message.channel.send(noquestioin);
}
const embed = new Discord.RichEmbed()
.setAuthor(`8ball`, 'http://8ballsportsbar.com/wp-content/uploads/2016/02/2000px-8_ball_icon.svg_.png')
.addField('Info:', `**Your Question:** ${question}\n**My Prediction:** ${answers[~~(Math.random() * answers.length)]}`)
.setColor('RANDOM');



message.channel.send({ embed }).catch(e => logger.error(e))
}

module.exports.help = {
  name: "8ball"
}
