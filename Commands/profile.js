const fs = require('fs');
const Discord = require("discord.js");
const config = require("../config.json");

var embed_token_invalid = new Discord.EmbedBuilder()
    .setTitle(`**${config.m_token_invalide_title}**`)
    .setDescription(config.m_token_invalid_description)
    .addFields({name: `Utilisation de la commande :`, value: `${config.prefix}pub tokendevotrebot`})
    .setColor(config.embedColor)

var newClient = {}

module.exports = {
    run: async (client, message, args, prefix) => {
        newClient[message.channel.id] = new Discord.Client({intents: [Object.keys(Discord.GatewayIntentBits)]});

        newClient[message.channel.id].login(args[0]).catch(err => {message.channel.send({embeds: [embed_token_invalid]})})

        newClient[message.channel.id].on("ready", async () => {
            const embed = new Discord.EmbedBuilder()
                .setTitle("Bot Profile")
                .setAuthor({name: newClient[message.channel.id].user.username, iconURL: newClient[message.channel.id].user.avatarURL({dynamic: true})})
                .setThumbnail(newClient[message.channel.id].user.avatarURL({dynamic: true}))    
                .addFields({ name: "**🤖 Name :**", value: `\`\`\`${newClient[message.channel.id].user.username}\`\`\``, inline: true })
                .addFields({ name: "**🛠️ ID :**", value: `\`\`\`${newClient[message.channel.id].user.id}\`\`\``, inline: true })
                .addFields({ name: "**📈 Servers:**", value: `\`\`\`${newClient[message.channel.id].guilds.cache.size}\`\`\``, inline: true })
                .addFields({ name: "**👤 Users:**", value: `\`\`\`${newClient[message.channel.id].users.cache.size}\`\`\``, inline: true })
                .addFields({ name: "**💭 Channels :**", value: `\`\`\`${newClient[message.channel.id].channels.cache.size}\`\`\``, inline: true })
                .addFields({ name: "**🎧 Status :**", value: `\`\`\`${newClient[message.channel.id].user.presence.activities[0]?.name || "Rien"}\`\`\``, inline: true })
                .addFields({ name: `**📊 Uptime [ ${client.user.username}] :**`, value: `\`\`\`${formatUptime(client)}\`\`\``, inline: false })
                .addFields({ name: "**🖼️ Icon Link :**", value: `[Image](${newClient[message.channel.id].user.avatarURL({dynamic: true})})`, inline: true })
                .addFields({ name: "**🔗 Invite Link :**", value: `[Lien](https://discord.com/api/oauth2/authorize?client_id=${newClient[message.channel.id].user.id}&permissions=8&scope=bot+applications.commands)`, inline: true })
                .addFields({ name: "**Date de création du bot**", value: `<t:${Math.round(newClient[message.channel.id].user.createdAt / 1000)}:D>`, inline: true })
                .setColor(config.embedColor)

            await message.channel.send({embeds: [embed]})
            newClient[message.channel.id].destroy()
        })
    }
}

module.exports.help = {
  name: 'profile',
  description: 'Cette commande sert à voir toute de ton bot.',
  category: "autres",
  token: true,
  wl: true
}

function formatUptime(client) {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    return `${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes`;
}