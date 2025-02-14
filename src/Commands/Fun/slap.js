const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'slap',
  aliases: ['tapa'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  async exec({ client, message, args, t }) {
    
    const gifList = [
      'https://i.imgur.com/fm49srQ.gif',
      'https://c.tenor.com/E3OW-MYYum0AAAAC/no-angry.gif',
      'https://c.tenor.com/wOCOTBGZJyEAAAAC/chikku-neesan-girl-hit-wall.gif',
      'https://c.tenor.com/FJsjk_9b_XgAAAAC/anime-hit.gif',
      'https://c.tenor.com/E4Px9kJOQ5wAAAAC/anime-kid.gif',
      'https://c.tenor.com/PeJyQRCSHHkAAAAC/saki-saki-mukai-naoya.gif',
      'https://c.tenor.com/XiYuU9h44-AAAAAC/anime-slap-mad.gif',
      'https://c.tenor.com/iDdGxlZZfGoAAAAC/powerful-head-slap.gif',
      'https://c.tenor.com/Ws6Dm1ZW_vMAAAAC/girl-slap.gif',
      'https://c.tenor.com/ZTozcByNaYMAAAAC/slap-butts-anime.gif',
      'https://c.tenor.com/fy60RaCWq08AAAAC/shikamaru-temari.gif',
    ];

    const randomGif = gifList[Math.floor(Math.random() * gifList.length)];

    let user = await client.utils.getUser(args[0], message);

    if (!user) return message.reply(`**${Emojis.errado} › ${t('commands:slap.noMention')}**`);
    if(user.id === client.user.id) {
      user = message.author;
      message.author = client.user;
    }

    message.reply({
      files: [randomGif],
      content: `**${Emojis.heart} › ${message.author} ${t('commands:slap.message')} ${user}!**`,
    });
  }
};
