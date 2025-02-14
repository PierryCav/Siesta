const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'lock',
  aliases: ['trancar'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 🔨 Moderation ] Locks the channel',
  options : [],
  async exec({ client, message, t }) {
    
    if (!message.member.permissions.has('MANAGE_CHANNELS') && !client.owners.some(id => id === message.author.id) ) return message.reply(`**${Emojis.errado} › ${t('commands:lock.userPermission')}**`);

    if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.reply(`**${Emojis.errado} › ${t('commands:lock.myPermission')}**`);

    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: false,
    });

    message.reply(`**${Emojis.ban} › ${t('commands:lock.sucess')}**`);
  }
};
