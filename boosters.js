const { MessageButton, MessageEmbed, MessageActionRow, MessageAttachment } = require("discord.js");
const Discord = require('discord.js');
const prefix = '$';
import { token, thumbnail, boostersRole, boostersChannel} from "config.js";

const client = new Discord.Client({
intents: 32767
});
const db = require('pro.db');
client.setMaxListeners(999999);
client.on("ready", () => {
  console.log('boosters.js Ready');
});


client.on('messageCreate' ,async message => {
    try {
    
  if(message.content.startsWith(prefix+'role name')) {
    if (message.channel.id !== boostersChannel) return;
    if (message.member.premiumSince === null) return message.reply(`${message.member.user.tag} ما سويت بوست.`);
    const args = message.content.split(' ');
    const name = args.slice(2).join(' ');
    const roleID = db.fetch(`boost_${message.author.id}`);
        if (!roleID) {
          return message.reply(`ما عندك رتبة\n${prefix}role create \`الاسم\``)
        }
      const role = message.guild.roles.cache.find(r=> r.id === roleID);
      if(!role) {
        db.delete(`boost_${message.author.id}`);
        return message.reply(`ما عندك رتبة\n${prefix}role create \`الاسم\``)
    }
    const embed = new MessageEmbed()
    .setTitle('Role Create')
    .setDescription(`**تم تعديل اسم رتبتك لـ${name}
    **`)
    .setThumbnail(thumbnail)
    .setColor('#ff96f4');
    if (!name) return message.reply('رجاء اكتب اسم الرتبة');
    role.setName(name)
    message.reply({embeds: [embed]});
    
  }
        } catch {console.log("error")}
});
client.on('messageCreate' ,async message => {
    try {
    
  if(message.content.startsWith(prefix+'role create')) {
    if (message.channel.id !== boostersChannel) return;
    const ifhas = db.fetch(`boost_${message.author.id}`);
    if (ifhas) return message.reply('لديك رتبة بالفعل!');
    if (message.member.premiumSince === null) return message.reply(`${message.member.user.tag} ما سويت بوست.`);
    const args = message.content.split(' ');
    const name = args.slice(2).join(' ');
    const embed = new MessageEmbed()
    .setTitle('Role Create')
    .setDescription(`**
    تم انشاء رتبة ${name} واعطائها لك ! 
    **`)
    .setThumbnail(thumbnail)
    .setColor('#ff96f4');
    if (!name) return message.reply('رجاء اكتب اسم الرتبة');
    const role = await message.guild.roles.create({ name: name });
    db.set(`boost_${message.author.id}`,role.id)
    const targetRole = message.guild.roles.cache.get(boostersRole);
    if (targetRole) {
      const newPosition = targetRole.position + 1;
      await role.setPosition(newPosition).catch(console.error);
      await message.member.roles.add(role).then(message.reply({embeds: [embed]}));
    }
  }
        } catch {console.log("error")}
});

client.on('messageCreate', async message => {
    try {
    
  if (message.content.startsWith(prefix+'role icon')) {

      if (message.channel.id !== boostersChannel) return;
      const boostCount = message.guild.premiumSubscriptionCount;

      if (boostCount < 7) return message.channel.send(`السيرفر ما فيه بوستات كافية, لازم 7 والسيرفر فيه ${boostCount} بوستات`);
      const roleID = db.fetch(`boost_${message.author.id}`);
        if (!roleID) {
          return message.reply(`ما عندك رتبة\n${prefix}role create \`الاسم\``)
        }
      const role = message.guild.roles.cache.find(r=> r.id === roleID);
      if(!role) {
        db.delete(`boost_${message.author.id}`);
        return message.reply(`ما عندك رتبة\n${prefix}role create \`الاسم\``)
    }
      else {
          
          let iconURL;

          if (message.content === prefix+'role icon remove') {
              try {
                  await role.setIcon(null);
                  return message.reply('Role icon has been removed.');
              } catch (error) {
                  console.error(error);
                  return message.reply('Failed to remove the role icon. Please make sure I have the necessary permissions.');
              }
          }

          if (message.attachments.size > 0) {
              iconURL = message.attachments.first().url;
          } else {
              const args = message.content.split(' ');
              const input = args.slice(2).join(' ');
              const emoji = input.match(/<a?:\w+:(\d+)>/);
              if (emoji) {
                  iconURL = `https://cdn.discordapp.com/emojis/${emoji[1]}.png`;
              } else {
                  iconURL = input;
              }

              if (!iconURL) return message.reply('رجاء اكتب رابط صورة صالح.');
          }

          try {
              const embed = new MessageEmbed()
                  .setTitle('Role Icon Change')
                  .setDescription(`**
                  تم تغيير ايكون رتبتك !
                  **`)
                  .setImage(iconURL)
                  .setThumbnail(thumbnail)
                  .setColor('#ff96f4');
              await role.setIcon(iconURL);
              message.reply({embeds: [embed]});
          } catch (error) {
              console.error(error);
              message.reply('Failed to update the role icon. Please make sure the URL is correct and I have the necessary permissions.');
          }
      }
  }
        } catch {console.log("error")}
});




  client.on('messageCreate', message => {
      try {
    if (message.content === (prefix+'role delete')) {
        if (message.channel.id !== boostersChannel) return;
        const roleID = db.fetch(`boost_${message.author.id}`);
        if (!roleID) {
          return message.reply(`ما عندك رتبة\n${prefix}role create \`الاسم\``)
        }
      const role = message.guild.roles.cache.find(r=> r.id === roleID);
      if(!role) {
        db.delete(`boost_${message.author.id}`);
        return message.reply(`ما عندك رتبة\n${prefix}role create \`الاسم\``)
    }
      const embed = new MessageEmbed()
    .setTitle('Role Delete')
    .setDescription(`**
    تم حذف رتبتك !
    **`)
    .setThumbnail(thumbnail)
    .setColor('#ff96f4');
      role.delete().then(db.delete(`boost_${message.author.id}`))
      message.reply({embeds: [embed]})
    }
          } catch {console.log("error")}
  })
  



client.on('messageCreate', message => {
    try {
    if (message.content === prefix+'role info') {
        if (message.channel.id !== boostersChannel) return;
        const roleID = db.fetch(`boost_${message.author.id}`);
        if (!roleID) {
          return message.reply(`ما عندك رتبة\n${prefix}role create \`الاسم\``)
        }
      const role = message.guild.roles.cache.find(r=> r.id === roleID);
      if(!role) {
        db.delete(`boost_${message.author.id}`);
        return message.reply(`ما عندك رتبة\n${prefix}role create \`الاسم\``)
    }
        
        if (role.icon) {
            const embed = new MessageEmbed()
        .setTitle('Role Info')
        .setDescription(`**
        اسم الرتبة : ${role.name}
        ايدي الرتبة : ${role.id}
        لون الرتبة : ${role.hexColor}
        **`)
        .setColor('#ff96f4')
        .setThumbnail(role.iconURL());
        message.reply({embeds: [embed]})
        }
        else if (!role.icon) {
            const embed = new MessageEmbed()
        .setTitle('Role Info')
        .setDescription(`**اسم الرتبة : ${role.name}
ايدي الرتبة : ${role.id}
لون الرتبة : ${role.hexColor}
        **`)
        .setColor('#ff96f4')
        .setThumbnail(thumbnail);
        message.reply({embeds: [embed]})
        }
        
    }
        } catch {console.log("error")}
});

client.on('messageCreate', message => {
    if (message.content === prefix+'role') {
        if (message.channel.id !== boostersChannel) return;

        message.reply(`**امر غير صالح ، تستطيع استخدامه هكذا:
        \`\`\`js
        role Create | delete | Name | Color | Icon \`\`\` **`)
    }
})
    







client.on('messageCreate', message => {
    try {
  if (message.content.startsWith(prefix+'role color')) {
    if (!boostersChannel.includes(message.channel.id)) return;
    const roleID = db.fetch(`boost_${message.author.id}`);
    if (!roleID) {
      return message.reply(`ما عندك رتبة\n${prefix}role create \`الاسم\``)
    }
    const role = message.guild.roles.cache.find(r=> r.id === roleID);
    if(!role) {
      db.delete(`boost_${message.author.id}`);
      return message.reply(`ما عندك رتبة\n${prefix}role create \`الاسم\``)
    }
    else {
      const args = message.content.split(' ');
      const color = args.slice(2).join(' ');
      const roleColor = role.color;
      if (color.toLowerCase() === 'random') {
        const randomColor = Math.floor(Math.random() * 16777215);
        role.setColor(randomColor)
          .then(updatedRole => {
            const embed = new MessageEmbed()
              .setTitle('Role Color')
              .setDescription(`**تم تغيير لون رتبتك الخاصة لون عشوائي**`)
              .setColor(`#${randomColor.toString(16)}`)
              .setThumbnail(thumbnail);
            return message.reply({embeds: [embed]});
          })
       .catch(console.error);
      }
      else if (isNaN(color)) {
        const roleByName = message.guild.roles.cache.find(r => r.name.toLowerCase() === color.toLowerCase());
        if (roleByName) {
          role.setColor(roleByName.color)
            .then(updatedRole => {
              const embed = new MessageEmbed()
                .setTitle('Role Color')
                .setDescription(`**تم تغيير لون رتبتك الخاصة لـ${color}**`)
                .setColor(`#${roleByName.color.toString(16)}`)
                .setThumbnail(thumbnail);

              return message.reply({embeds: [embed]});
            })
         .catch(console.error);
        }
        else {
          const hexCodeRegex = /^#[0-9a-fA-F]{6}$/;
          if (hexCodeRegex.test(color)) {
            role.setColor(color)
           .then(updatedRole => {
                const embed = new MessageEmbed()
               .setTitle('Role Color')
               .setDescription(`**تم تغيير لون رتبتك الخاصة لـ${color}**`)
               .setColor(color)
               .setThumbnail(thumbnail)
  
                return message.reply({embeds: [embed]});
              })
           .catch(console.error);
          }
          else {
            return message.reply('**رجاء اختر لون صالح**');
          }
        }
      }
      else if (roleColor!== parseInt(color)) {
        role.setColor(parseInt(color))
       .then(updatedRole => {
            const embed = new MessageEmbed()
           .setTitle('Role Color')
           .setDescription(`**تم تغيير لون رتبتك الخاصة لـ${color}**`)
           .setColor(color)
           .setThumbnail(thumbnail) 
            return message.reply({embeds: [embed]}); })
            .catch(console.error); } 
            else { return message.reply('اللون هو نفس اللون الحالي للرتبة');  
           }
           } 
          } 
        } catch {console.log("error")}
        });

client.login(token);