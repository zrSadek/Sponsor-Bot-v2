const fs = require('fs');
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    run: async (client, message, args, prefix) => {
        const wlid = message.channel.topic?.indexOf("whitelist: ")
        if (wlid !== -1 && message.channel.topic?.substring(wlid + 11).trim() === message.author.id){
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (!member) return message.channel.send("Veuillez mentionner un membre")

            await message.channel.permissionOverwrites.delete(member.id)

            message.channel.send(`${member.user.username} a été retiré du salon`)
        }
        else return message.channel.send("Ceci n'est pas votre canal privé")
    }
}

module.exports.help = {
  name: 'kick',
  description: 'Cette commande sert à retirer un membre de ton salon privé.',
  category: "autres",
  wl: true
}