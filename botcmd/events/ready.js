const chalk = require('chalk');
const figlet = require("figlet");
const ee = require("../../botconfig/embed.json");

module.exports = async function(client) {
   setInterval(() => {
    let tt = require('quick.db').fetch(`TicketTerbuka`);
    if(tt == null) {
      tt = '0';
    }
    client.user.setActivity(`${ee.teksAct}`, { type: ee.typeAct });
   }, 5 * 1000);
    console.log(chalk.yellow.bold(figlet.textSync("Ticket Tool")));
    await console.log(chalk.red.bold(client.user.tag) + chalk.blue.bold(` Is Ready\nID: ${client.user.id}`));

}