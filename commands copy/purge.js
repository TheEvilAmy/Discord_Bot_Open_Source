module.exports = {
    name: 'purge',
    description: 'Delete messages.',
    async execute(message, args, Discord) {
        if (
            message.member.hasPermission("ADMINISTRATOR")
        ) {
            if (!args[0]) return message.reply("Please enter amount that you want to delete! 1-100");
            if (isNaN(args[0])) return message.reply("Please enter a Number!");

            if (args[0] > 100) return message.reply("You cannot delete over 100 messages!");
            if (args[0] < 1) return message.reply("You cannot delete 0 messages!");

            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages);

                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor('#fcfbfb')
                    .setDescription('**Success! Channel has been purged!**')
                    .setTimestamp()
                message.channel.send(embed)
            })
        }
    }
}