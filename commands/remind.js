const ms = require('ms')

module.exports = {
    name: "remind",
    description:{
        usage: "remind <time> <reminder>",
        content:  "Helps remind you something",
    },
    async execute(message, args, Discord) {
        let time = args[0];
        let user = message.author
        let reminder = args.splice(1).join(' ')

        const notime = new Discord.MessageEmbed()
            .setColor('#fcfbfb')
            .setDescription(`**Please specify the time!**`)

        const wrongtime = new Discord.MessageEmbed()
            .setColor('#fcfbfb')
            .setDescription(`**Sorry I only do d = days, m = minutes , h = hours, or s = seconds.**`)

        const reminderembed = new Discord.MessageEmbed()
            .setColor('#fcfbfb')
            .setDescription(`**Please tell me what you want to be reminded off!**`)

        if (!args[0]) return message.channel.send(notime)
        if (
            !args[0].endsWith("d") &&   
            !args[0].endsWith("m") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("s")
        )


            return message.channel.send(wrongtime)
        if (!reminder) return message.channel.send(reminderembed)

        const remindertime = new Discord.MessageEmbed()
        .setColor('#fcfbfb')
        .setDescription(`\**Your reminder will go off in ${time}**`)

        message.channel.send(remindertime)

        const reminderdm = new Discord.MessageEmbed()
        .setColor('#fcfbfb')
        .setTitle('**REMINDER**')
        .setDescription(`**It has been ${time} here is your reminder:** ${reminder}`)  

        setTimeout(async function () {
           try{

            await user.send(reminderdm)
           }catch(err){

           } 
           
        }, ms(time));
    }
}