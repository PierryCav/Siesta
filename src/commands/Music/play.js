const { MessageEmbed } = require(`discord.js`);
const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: `play`,
  aliases: [`tocar`, `p`],
  cooldown: 0,
  run: async (client, message, args, p, lang) => {

        if (p) {
          if (message.member.voice.channel?.id != message.guild.me.voice.channel.id) return message.reply(`**${Emojis.errado} » ${lang.commands.play.wrongVoiceChannel}**`);
        }

        if (!message.member.voice.channel)return message.reply(`**${Emojis.errado} » ${lang.commands.play.noVoiceChannel}**`);
        const music = args.join(' ');

        if (!music) return message.reply(`**${Emojis.errado} » ${lang.commands.play.noArgs}**`);

        const result = await client.music.search(music, message.author);

        if (result.loadType === `LOAD_FAILED`)
          return message.reply(
            `**${Emojis.errado} » ${lang.commands.play.failedToPlay}**`
          );
        if (result.loadType === `NO_MATCHES`)
          return message.reply(
            `**${Emojis.errado} » ${lang.commands.play.noMatches}.**`
          );

        const player = client.music.createPlayer({
          guildId: message.guild.id,
          voiceChannelId: message.member.voice.channel.id,
          textChannelId: message.channel.id,
          selfDeaf: true,
        });

        if (player.state === 2) player.connect();

        if (result.loadType === `PLAYLIST_LOADED`) {

          for (const track of result.tracks) {
            track.setRequester(message.author);
            player.queue.push(track);
          }

          if (!player.playing) player.play();

          message.reply(
            `**${Emojis.music} » ${lang.commands.play.playListLoaded.replace('{name}', result.playlistInfo?.name).replace('{length}', result.tracks.length)}**`
          );
        } else {
          const track = result.tracks[0];
          track.setRequester(message.author);
          player.queue.push(track);

          if (p) {
            message.reply(
              `**${Emojis.music} » ${lang.commands.play.musicLoaded.replace('{}', track.title)}**`
            );
          }

          if (!player.playing) player.play();
        }
      }
}
