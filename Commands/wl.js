const config = require("../config.json")
module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(config.helperRole)) return;

    message.delete().catch(() => false)
    const m = await message.channel.send({ embeds: [{ title: "Whitelist Acces", color: 0x00FF00, description: "- **Cliquez sur `✅` pour devenir whitelist.**" }] })
    m.react("✅").catch(() => false)
    message.channel.send('## Tu cliques = Whitelist')

}

module.exports.help = {
    name: "wl",
    hide: true,
    helper: true,
}