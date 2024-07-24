const fs = require('fs');
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    run: async (client, message, args, prefix) => {
        var eHelp = new Discord.EmbedBuilder()
          .setTitle(`**__Voici les commandes du bot ${client.user.username} (${client.commands.size} Cmds) :__**`)
          .setThumbnail("https://images-ext-2.discordapp.net/external/kqVPuhjXMwBLCRx8TPqoK9jarONo_qCKyGaH4ezFNQs/https/cdn.discordapp.com/icons/1170776059126501458/b84b58dfccfc47dd04b336abbcee2d80.webp?format=webp")
          .setDescription("`token_bot` doit être remplacé par le token de votre bot !")
          .setColor(config.embedColor)
          if (config.helpimg) eHelp.setImage(config.helpimg)
          
        const commandFiles = fs.readdirSync(`./Commands/`).filter(file => file.endsWith('.js'));
    
        for (const file of commandFiles) {
          const command = require(`./${file}`);
          
          if (command.help.hide || command.help.category !== "normal") continue;
          eHelp.addFields({name: `**${config.prefix}\`${command.help.name}${command.help.token ? ` token_bot` : ""}\`**`, value: `${config.emoji ?? ""} ${command.help.description ?? "Aucune description"}`})
        }
        
        message.channel.send({embeds: [eHelp]})
    }
}

module.exports.help = {
  name: 'hnormal',
  description: 'Cette commande sert à voir toutes les commandes dmall NORMAL.',
  category: "help"
}