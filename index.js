require('colors');
const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client({intents: [Object.keys(Discord.GatewayIntentBits)]});

client.commands = new Discord.Collection();
client.login(config.token);


fs.readdir("./Commands/", (err, files) => {
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    jsfiles.forEach((f, i) => {
        let props = require(`./Commands/${f}`) 
        client.commands.set(props.help.name, props);
    })
})




client.on("ready", () => {
    console.log(
        `Connected has ${client.user.tag}\n`.bgGreen.black +
        `Client Id: ${client.user.id}\n`.bgGreen.black +
        `Invite: https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8\n`.bgGreen.black +
        `Discord Version: ${Discord.version}`.bgGreen.black
    )

    client.user.setActivity(config.stream, {type: 1, url: "https://twitch.tv/002sans"});
})


client.on("messageCreate", async message => {
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");

    if (!message.content.startsWith(prefix)) return;
    
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandFile = client.commands.get(cmd.slice(prefix.length));

    if (message.guild){
        if (commandFile && commandFile.wl && !message.member.roles.cache.get(config.wlrole)) return;
        if (commandFile && commandFile.helper && !message.member.roles.cache.get(config.helperRole)) return;
        if (commandFile) commandFile.run(client, message, args)
    }
    else {
        const guild = client.guilds.cache.get(config.guildId)
        if (!guild) return console.log("[!] Veuillez entrer l'ID du serveur dans le fichier config.json");

        const member = guild.members.cache.get(message.author.id)
    
        if (commandFile && commandFile.wl && (!member || !member.roles.cache.has(config.wlrole))) return message.channel.send({ embeds: [{color: 0xFF0000, description: `**✅ 〃 Vous devez être __WhiteList__ pour utiliser cette commande, diriger vous vers <#votreIdDeSalon> .**`}] })
        if (commandFile) commandFile.run(client, message, args)
    }
})

client.on('messageReactionAdd', (reaction, user) => {
    if (user.id === client.user.id) return;
    if (!reaction.message.embeds.length === 0) return;
    if (!reaction.message.embeds[0].title === "Whitelist Acces") return;
    reaction.remove().catch(() => false)

    if (reaction.emoji !== "✅") return;

    const role = reaction.message.guild.roles.cache.get(config.wlrole)
    if (!role) return;

    const logChannel = reaction.message.guild.channels.cache.get(config.logChannel)
    const member = reaction.message.guild.members.cache.get(user.id)

    member.roles.add(role, "Accès Whitelist")
        .then( () => {
            logChannel.send(`- ${user} (${user.username}) vient d'obtenir l'accès à ${config.stream}`)
            
            const embed = new Discord.EmbedBuilder()
                .setTitle(`**__Voici les commandes du bot ${client.user.username} (${client.commands.size} Cmds) :__**`)
                .setThumbnail("https://images-ext-2.discordapp.net/external/kqVPuhjXMwBLCRx8TPqoK9jarONo_qCKyGaH4ezFNQs/https/cdn.discordapp.com/icons/1170776059126501458/b84b58dfccfc47dd04b336abbcee2d80.webp?format=webp")
                .setDescription("`token_bot` doit être remplacé par le token de votre bot !")
                .setColor(config.embedColor)
                if (config.helpimg) embed.setImage(config.helpimg)
                    
            const commandFiles = fs.readdirSync(`./Commands/`).filter(file => file.endsWith('.js'));
    
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                
                if (command.help.hide || command.help.category !== "help") continue;
                embed.addFields({name: `**${config.prefix}\`${command.help.name}${command.help.token ? ` token_bot` : ""}\`**`, value: `${config.emoji ?? ""} ${command.help.description ?? "Aucune description"}`})
            }

            user.send({ embeds: [embed] })
        })
        .catch(() => false) 
})
