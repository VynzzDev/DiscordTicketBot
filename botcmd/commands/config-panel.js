const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'config-panel',
  aliases: ['configpanel','config'],
  cooldown: 7,
  run: async function(client, message, args) {
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    message.channel.send(`Anda tidak memiliki permission administrator untuk menggunakan ini`);
   }
  try {
    var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
    if(prefix == null) prefix = require('../../config/bot').prefix;
    let config = args.join(' ').split(" | ")
    if(!config[2]) {
       const error = new MessageEmbed()
        .setTitle('**❌ | INVALID USAGE**')
        .setDescription(`> ${prefix}config-panel \`Panel Title | Panel Description | Panel Button Label\``)
        .setColor('#FF0000');
      return message.channel.send(error);
    }
    
    message.react('✅');
    message.channel.send({
      embed: {
        description: `> Kamu berhasil mengatur config panel. Silahkan setup ulang panel menggunakan \`${prefix}setup\``,
        color: 0x0F0F0F
      }
    });
    
    require('quick.db').set(`tickTitle_${message.guild.id}`, config[0]);
    require('quick.db').set(`tickDesc_${message.guild.id}`, config[1]);
    require('quick.db').set(`tickButton_${message.guild.id}`, config[2]);
  } catch (err) { 
     return; 
  }
 }
}