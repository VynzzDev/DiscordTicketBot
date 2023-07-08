const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  cooldown: 7,
  aliases: ['commands'],
  run: async(client, message) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return;
    }
    try {
      const hm = new MessageEmbed()
      .setTitle(`Bot Commands List`)
      .setColor('RANDOM')
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .addFields(
        { name: 'ℹ️ Other', value: ">>> \`help︲open︲close︲add︲remove︲rename︲transcript\`", inline: false },
        { name: '⚙️ Configuration', value: ">>> \`config-panel︲config-ticketmsg︲ticketcat︲setup\`", inline: false }
      )
      message.channel.send(hm);
    } catch (err) {
      return;
    }
  }
}