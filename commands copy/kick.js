module.exports = {
    name: "kick",
    description: "kicks a member",
    execute(message, args, Discord) {
        if (
            message.member.hasPermission("ADMINISTRATOR") ||
            message.member.hasPermission("KICK_MEMBERS")
        ) {
            const target = message.mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                const kick = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setAuthor('Success!')
                    .setDescription('```Player has been kicked!```')
                message.channel.send(kick)
            }
        } 
    }
}