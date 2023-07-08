const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'config-ticketmsg',
  aliases: ['ticketopenmessage','config-msg','ticket-message'],
  cooldown: 5,
  run: async function(client, message, args) {
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(`Anda tidak memiliki permission untuk menggunakan ini`);
  }
  try {
    var prefix = require('../../config/bot').prefix;
    let msg = args.join(' ')
    if(!msg) {
      const slh = new MessageEmbed()
      .setTitle('**❌ | INVALID USAGE**')
      .setDescription(`> ${prefix}config-ticketmsg \`<TEKS>\``)
      .setColor('#FF0000')
      return message.channel.send(slh);
    }
    
    message.react('✅')
    message.channel.send({
      embed: {
        description: '> Kamu berhasil mengatur ticket message. Message ini akan dikirimkan ketika membuka ticket!',
        color: 0xFF00FF
      }
    })
    require('quick.db').set(`tickMsg_${message.guild.id}`, msg);
    
  } catch (err) { 
    return; 
  }
 }
}