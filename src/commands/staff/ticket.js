const Discord = require('discord.js');

module.exports = {
  nome: "ticket",
  run: async(client, message, args) => {
    try {

  const user = message.author.id;

  const nomeuser = message.author.username;

  const channelname = `ticket_${nomeuser.trim().toLowerCase()}`;

  const chat = client.channels.cache.find(channel => channel.name === channelname);

  if(args[0] == "open") {
  if (chat) {
    message.channel.bulkDelete(1);

    const embedjacriado = new Discord.MessageEmbed()
        .setTitle('Você já tem um ticket criado!')
        .setColor('RED')
        .setImage()
        .setTimestamp()

        message.channel.bulkDelete(1);

    return message.reply(embedjacriado)
      .then(msg => msg.delete({timeout: 1000 * 8}))
      .catch(error => console.log(`Ao deletar a mensagem ocorreu o seguinte erro: ${error}`));
  }

  message.channel.bulkDelete(1);

  message.guild.channels.create(channelname, {
    type: 'text',
  }).then((channel) => {
    const idcategoria = client.config.ticketCategoria
    channel.setParent(idcategoria)

    channel.updateOverwrite(message.guild.roles.everyone, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false
    })

    channel.updateOverwrite(user, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true
    })

  })
  } else if(args[0] == "close") {
    if(!message.channel.name.includes("ticket_")) return message.channel.send(new Discord.MessageEmbed()
        .setTitle('Este chat não é um ticket!')
        .setColor('RED')
        .setImage()
        .setTimestamp())

    message.channel.send(new Discord.MessageEmbed()
          .setTitle('🎫 O ticket será finalizado! 🎫')
          .setColor('#9c0024')
          .setDescription('**O ticket será finalizado em 10 segundos!**')
          .setImage()
          .setTimestamp())

    setTimeout(function() {
      message.channel.delete()
    }, 10000)
  }
    } catch (_) {}

  }}