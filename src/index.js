const Discord = require("discord.js");
const client = new Discord.Client();
client.config = require("./config.json");
const fs = require("fs");

fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.config = require(__dirname + "/config.json")
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
var pastas = fs.readdirSync(__dirname + '/commands');
for (pasta of pastas) {
  let comandos = fs.readdirSync(__dirname + '/commands/' + pasta);
  for (comando of comandos) {
    if (comando.endsWith('.js')) {
    let nome = comando.split('.')[0];
    let base = require(__dirname + `/commands/${pasta}/${comando}`);
    client.commands.set(nome, base);
    if (base.aliases && Array.isArray(base.aliases)) {
    for (apelido of base.aliases) {
    client.aliases.set(apelido, nome);
    };
    };
  };
};
};

client.login(process.env.TOKEN)