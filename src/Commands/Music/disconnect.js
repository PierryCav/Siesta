const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'disconnect',
  aliases: ['leave', 'parar', 'dc', 'desconectar', 'stop', 'clearqueue'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Disconnect the bot from the voice channel.',
  options: [],
  async exec({ message, player, t }) {

    player.destroy();
    message.reply(`**${Emojis.music} › ${t('commands:disconnect.sucess')}**`);
    
  }
};
