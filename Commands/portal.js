const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    run: async (client, message, args, prefix) => {
        var embed = new Discord.EmbedBuilder()
            .setTitle(`Discord Developer Portal - API Docs pour les développeurs de bots`)
            .setImage("https://discord.com/assets/4b357782daec4239711055c06af93881.png")
            .setDescription("Intègre ton service avec Discord — si c’est un bot ou un jeu ou tout ce que votre imagination la plus folle peut venir avec.")
            .setColor(config.embedColor)
            .setURL("https://discord.com/developers/applications")    

            const button = new Discord.ButtonBuilder()
            .setStyle(5)
            .setLabel("Discord Developer Portal")
            .setURL("https://discord.com/developers/applications")
        
            const row = new Discord.ActionRowBuilder().addComponents(button)
        message.channel.send({embeds: [embed], components: [row]})
    }
}

module.exports.help = {
  name: 'portal',
  description: 'Cette commande sert à avoir le lien du developper portal.',
  category: "autres"
}