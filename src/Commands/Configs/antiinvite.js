const { MessageEmbed } = require('discord.js-light');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'antiinvite',
  aliases: ['anticonvites'],
  playerOnly: false,
  sameChannel: false,
  ownerOnly: false,
  async exec({ client, message, args, t }) {
      
    if (!message.member.permissions.has('MANAGE_GUILD') && !client.owners.some(id => id === message.author.id)) return message.reply(`${Emojis.errado}** › ${t('commands:antiinvite.errorPerm')}**`);

    const guild = await client.db.guild.findOne({ _id: message.guild.id });

    const embed = new MessageEmbed()
      .setColor(client.color)
      .setFooter({
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({
          dynamic: true,
        })
      })
      .addFields(
        {
          name: `${Emojis.ban} › ${t('commands:antiinvite.firstField.title')}`,
          value: String(t('commands:antiinvite.firstField.value'))
        },
        {
          name: `${Emojis.config} › ${t('commands:antiinvite.secondField.title')}`,
          value: String(t('commands:antiinvite.secondField.value'))
        }
      )
      .setTitle(`${Emojis.config} • __Siesta__`);

    if (!args[0] || ![
      'desativar',
      'disable',
      'ativar',
      'enable',
      'whitelist',
      'ignorar',
    ].some((x) => x == args[0].toLowerCase())
    )
      return message.reply({ embeds: [embed] });

    if (['ativar', 'enable'].some((x) => x == args[0].toLowerCase())) {
      await client.db.guild.findOneAndUpdate({ _id: message.guild.id },
        {
          $set: {
            'antiinvite.status': true
          }
        });
      message.reply(`**${Emojis.config} › ${t('commands:antiinvite.enabled')}**`);
    }

    if (['desativar', 'disable'].some((x) => x == args[0].toLowerCase())) {
      await client.db.guild.findOneAndUpdate({ _id: message.guild.id }, {
        $set: {
          'antiinvite.status': false
        }
      });
      message.reply(`**${Emojis.config} › ${t('commands:antiinvite.disabled')}**`);
    }
    if (['whitelist', 'ignorar'].some((x) => x == args[0].toLowerCase())) {

      if (!args[1] || !['add', 'remove'].some((x) => x == args[1].toLowerCase())) return message.reply(`**${Emojis.errado} › ${t('commands:antiinvite.errorWhiteList')}.**`);

      if (['add', 'adicionar'].some((x) => x == args[2].toLowerCase())) {

        const channel =message.mentions.channels.first() || message.guilds.channels.cache.get(args[2]) || message.channel;
        const channelsList = guild.antiinvite.whitelist;
        if (channelsList.some((x) => x == channel.id)) return message.reply(`**${Emojis.errado} › ${t('commands:antiinvite.channelAltereadySet')}.**`);
        await client.db.guild.findOneAndUpdate({ _id: message.guild.id },
          {
            $push: { 'antiinvite.whitelist': channel.id }
          });
        message.reply(`**${Emojis.config} › ${t('commands:antiinvite.addedChannel')}**`);
      }
      if (['remove', 'remover'].some((x) => x == args[2].toLowerCase())) {
        const channel =
              message.mentions.channels.first() ||
              message.guilds.channels.cache.get(args[2]) ||
              message.channel;
        const channelsList = guild.antiinvite.whitelist;
        if (!channelsList) guild.antiinvite.whitelist;
        if (!channelsList.some((x) => x == channel.id))
          return message.reply( `**${Emojis.errado} › ${t('commands:antiinvite.removeError')}!**`);
        const NumberInList = channelsList.indexOf(channel.id);
        channelsList.splice(NumberInList, 1);
        await client.db.guild.findOneAndUpdate({ _id: message.guild.id },
          {
            $set: {
              'antiinvite.whitelist': channelsList
            }
          });
        message.reply(
          `**${Emojis.config} › ${t('commands:antiinvite.removed')}**`
        );
      }
    }
  }
};
