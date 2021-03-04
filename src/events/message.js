module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  const args = message.content.trim().slice(client.config.prefix.length).split(/ +/g);
  const command = args.shift().toLowerCase();
  if(!command) return;

  let cmdfile = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if(!cmdfile) return;

  try {
    cmdfile.run(client, message, args);
  } catch (_) {}
}