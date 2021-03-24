const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const bot = new Discord.Client();
const fs = require('fs');
const got = require('got');
const ms = require('ms');
const fetch = require('node-fetch');
const moment = require('moment');
const DiscordJS = require('discord.js')

require('dotenv').config();

const prefix = process.env.prefix;

var servers = {};

// Debug
const printObject = require('./debug')
const exampleObject = {
    name: 'Debug',
    channel: 'Debug log',
}

printObject(exampleObject)

// Show amount of server it in
client.once('ready', () => {
    console.log('Bot is online!');
    client.user.setActivity(`${client.guilds.cache.size} servers!`, { type: "WATCHING" });
})

// Command Folder

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'purge') {
        client.commands.get('purge').execute(message, args, Discord);
    } else if (command === 'avatar') {
        client.commands.get('avatar').execute(message, args, Discord);
    } else if (command === 'remind') {
        client.commands.get('remind').execute(message, args, Discord);
    } else if (command === 'ban') {
        client.commands.get('ban').execute(message, args, Discord);
    } else if (command === 'kick') {
        client.commands.get('kick').execute(message, args, Discord);
    } else if (command === 'mute') {
        client.commands.get('mute').execute(message, args, Discord);
    } else if (command === 'unmute') {
        client.commands.get('unmute').execute(message, args, Discord);
    } else if (command === 'coinflip') {
        client.commands.get('coinflip').execute(message, args, Discord);
    } else if (command === 'meme') {
        client.commands.get('meme').execute(message, args, Discord);
    } else if (command === 'whois') {
        client.commands.get('whois').execute(message, args, Discord);
    }
});

// Server info Command

client.on('message', message => {
    if (message.content.startsWith(process.env.prefix + "serverinfo")) {
        if (message.author.bot || !message.guild) return message.reply("this command for server only")
        var EMBED = new Discord.MessageEmbed()
            .setTitle("Server Info")
            .addField("Server name 🎗️", `${message.guild.name}`)
            .addField("Server id 🆔", `${message.guild.id}`)
            .addField("Server owner 👑", `${message.guild.owner}`)
            .addField("Members 👥", `${message.guild.memberCount}`)
            .addField("Server roles 🔐", `${message.guild.roles.cache.size}`)
            .addField(" channels 💬", `  ${message.guild.channels.cache.filter(r => r.type === "text").size} Text
          ${message.guild.channels.cache.filter(r => r.type === "voice").size} Voice`)
            .addField("Server region 🌍", `${message.guild.region}`)
            .addField("Verification Level 📑", `${message.guild.verificationLevel}`)
            .addField("Created in 📆 ", `${message.guild.createdAt.toLocaleString()}`)
            .addField("Boosts ✨", `${message.guild.premiumSubscriptionCount}`)
            .setColor("#fcfbfb")
            .setFooter(`Requsted by ${message.author.username}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
        message.channel.send(EMBED)
    }
})

// Giveaway command

client.on('message', async message => {
    let args = message.content.substring(prefix.length).split(" ")
    if (message.member.permissions.has('ADMINISTRATOR')) {
        if (message.content.startsWith(`${process.env.prefix}giveaway`)) {
            let time = args[1]
            if (!time) return message.channel.send('You did not specify a time!');

            if (
                !args[1].endsWith("d") &&
                !args[1].endsWith("h") &&
                !args[1].endsWith("m") &&
                !args[1].endsWith("s")
            )
                return message.channel.send('You need to use d (days), h (hours), m (minutes), or s (seconds)')

            let gchannel = message.mentions.channels.first();
            if (!gchannel) return message.channel.send("I can't find that channel in the server!")

            let prize = args.slice(3).join(" ")
            if (!prize) return message.channel.send('Arguement missing. What is the prize?')

            message.delete()
            gchannel.send(":tada: **NEW GIVEAWAY** :tada:")
            let gembed = new Discord.MessageEmbed()
                .setTitle("New Giveaway!")
                .setDescription(`React with :tada: to enter the giveaway!\nHosted By: **${message.author}**\nTime: **${time}**\nPrize: **${prize}**`)
                .setTimestamp(Date.now + ms(args[1]))
                .setColor('#fcfbfb')
            let n = await gchannel.send(gembed)
            n.react("🎉")
            setTimeout(() => {
                if (n.reactions.cache.get("🎉").count <= 1) {
                    return message.channel.send("Not enough people for me to draw a winner!")
                }

                let winner = n.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
                gchannel.send(`Congratulations ${winner}! You just won the **${prize}**!`
                );
            }, ms(args[1]));
        }
    }
})

client.login(process.env.token);