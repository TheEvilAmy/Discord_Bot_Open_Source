module.exports = {
    name: "ban",
    description: "bans a member",
    execute(message, args, Discord) {
        if (
            message.member.hasPermission("ADMINISTRATOR") ||
            message.member.hasPermission("BAN_MEMBERS")
        ) {
            const target = message.mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                const ban = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setAuthor('Success!')
                    .setDescription('```Player has been banned!```')
                    message.channel.send(ban)
            }
        }
    }
}