const { MessageButton, MessageActionRow } = require('discord-buttons');
const ee = require("../../botconfig/embed.json");
const Discord = require('discord.js');

module.exports = {
    name: "setup-ticket",
    cooldown: 5,
    aliases: ["create"],

    run: async function(client, message, args) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "You should have admin perms to use this command!"
      );
    }
        try {
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = require('../../config/bot').prefix;
            var ticketChannel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel;
            var adminRole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
            var title = message.content.split(' ').slice(3).join(' ') || '**Multi-Ticket**\n\n__**Here You Can Open A Support, Other And Even A Claim Ticket!**__\n`Click The Button Category Below Based On Your Needs`';
            if (!adminRole) {
                message.channel.send({
                    embed: {
                        title: `**❌ | INVALID USAGE**`,
                        description: `> **${prefix}**setup \`[Channel] [Ticket support role]\``,
                        color: 0xFF0000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
                return
            }
            let buttonName = require('quick.db').fetch(`tickButton_${message.guild.id}`)
            if(buttonName == null) {
              buttonName = 'Buat Ticket';
            }
            message.react('✅');
            message.channel.send(`Ticket berhasil di setup!`);
            let btn = new MessageButton()
                .setStyle("blurple")
                .setLabel(buttonName)
                .setEmoji('📩')
                .setID("createTicket")
            let row = new MessageActionRow()
                .addComponent(btn)
                
            let panelAuthor = require('quick.db').fetch(`tickTitle_${message.guild.id}`)
            if(panelAuthor == null) {
              panelAuthor = '__Membuat Ticket__';
            }
            let panelDesc = require('quick.db').fetch(`tickDesc_${message.guild.id}`)
            if(panelDesc == null) {
              panelDesc = 'Klik tombol 📩 dibawah\nuntuk membuat ticket';
            }
                
                const panel = new Discord.MessageEmbed()
                .setTitle(panelAuthor)
                .setDescription(panelDesc)
//              .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setColor(`#5865F2`)
                .setFooter(`Ticket Tool`, client.user.displayAvatarURL({ format: 'png' }))
            ticketChannel.send(panel, row)
            .then(async function() {
                require('quick.db').set(`TicketAdminRole_${message.guild.id}`, adminRole.id);
            })
        } catch (err) {
            return;
        }
    }
}