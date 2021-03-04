const Discord = require("discord.js")

module.exports = {
  nome: "anuncio",
  run: async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send("Você precisa da permissão `Gerenciar Mensagens` para usar esse comando")
    const p1 = new Discord.MessageEmbed()
            .setColor("#4B0082")
            .setTitle("Onde você quer enviar o aviso?")

    const p2 = new Discord.MessageEmbed()
            .setColor("#4B0082")
            .setTitle("Qual o tituto desse aviso?")

    const p3 = new Discord.MessageEmbed()
            .setColor("#4B0082")
            .setTitle("Qual a descrição desse aviso?")

    const mencione = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("📛Mencione um chat!")

    message.channel.send(p1).then(msg1 => {
 let canal = message.channel.createMessageCollector(c => c.author.id === message.author.id, {max: 1})
 .on('collect', c => {
 let channel = c.mentions.channels.first()
 if(!channel) {
 
 message.channel.send(mencione)
 
 } else {

   const p10 = new Discord.MessageEmbed()
            .setColor("#00FF00")
            .setTitle(' ')
            .setDescription(`**✅ Anúncio enviado no canal <#${channel.id}> com sucesso.**`)
 
 message.channel.send(p2).then(msg2 => {
 let titulo = message.channel.createMessageCollector(t => t.author.id === message.author.id, {max: 1})
 .on('collect', t => {
 let title = t.content
 
 
 message.channel.send(p3).then(msg3 => {
 let descrição = message.channel.createMessageCollector(d => d.author.id === message.author.id, {max: 1})
 .on('collect', d => {
 let desc = d.content
 
 let anunciar = new Discord.MessageEmbed()
 .setColor('#4B0082')
 .setTitle(title)
 .setDescription(desc)
 .setFooter("By: "+message.author.username, message.author.displayAvatarURL({size: 32}))
 
 client.channels.cache.get(channel.id).send('@everyone', anunciar)
 
 message.channel.send(p10)
 
 })
 }) 
 })
 })
 }
 }) 
 })
  }}