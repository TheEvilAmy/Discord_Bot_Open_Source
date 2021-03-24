module.exports = {
    name: 'avatar',
    description: 'this is an avatar command',
    execute(message, args, Discord) {

        let member = message.mentions.users.first() || message.author
        let avatar = member.displayAvatarURL({ dynamic: true, size: 1024 })

        const avatarembed = new Discord.MessageEmbed()

            .setTitle(`${member.username}'s avatar`)
            .setImage(avatar)
            .setColor("#fcfbfb")

        message.channel.send(avatarembed);
    }
}