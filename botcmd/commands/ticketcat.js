const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ticketcat',
  aliases: ['ticket-category'],
  run: async function(client, message, args) {
  if(!message.member.hasPermission("ADMINISTRATOR")) { 
    return message.channel.send("Anda tidak memiliki permission untuk menggunakan ini");
  }
   try {
     var prefix = require('../../config/bot').prefix;
     let category = args[0] || message.channel.parentID || 'Tidak ada category';
     message.channel.send({
       embed: {
         description: `> Kamu berhasil mengatur category id pada ticket system \`->\` <#${category}>`,
         color: 0xFF0FF
       }
     })
     require('quick.db').set(`tickCat_${message.guild.id}`, category);
   } catch (err) {
     return;
   }
  }
}