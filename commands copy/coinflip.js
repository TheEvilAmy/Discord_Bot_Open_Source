module.exports = {
    name: 'coinflip',
    description: 'Delete messages.',
    async execute(message, args, Discord) {
        let results = ["heads", "tails"];

        let member = message.author

        let result = Math.floor((Math.random() * results.length));

        let choice = args.join(" ");

        const coinflipEmbed = new Discord.MessageEmbed()
            .setTitle(`The coin was **${results[result]}**`, true)
            .setColor("#ff7100")
            .setFooter(`${member.username}`)
            .setTimestamp();
        if (choice.startsWith("heads")) {
            coinflipEmbed.setDescription("You chose **heads**")
        } else if (choice.startsWith("tails")) {
            coinflipEmbed.setDescription("You chose **tails**")
        } else {
            message.channel.send("You need to choose either **heads** or **tails**.")
        }

        message.channel.send(coinflipEmbed)
    }
}