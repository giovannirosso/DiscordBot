const Canvas = require("canvas");
const Discord = require("discord.js");

const background = "images\\bebe_procurado.png";

const dim = {
  width: 673,
  height: 960,
  x: 75,
  y: 225,
};

const av = {
  size: 512,
  x: 90,
  y: 230,
};

const generateImage = async (member) => {
  let username = member.user.username;
  let discriminator = member.user.discriminator;
  let avatarURL = member.user.displayAvatarURL({
    extension: "png",
    dynamic: false,
    size: av.size,
  });

  const canvas = Canvas.createCanvas(dim.width, dim.height);
  const ctx = canvas.getContext("2d");

  const backimg = await Canvas.loadImage(background);
  ctx.drawImage(backimg, 0, 0);

  //draw white box for avatar
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(dim.x, dim.y, 615 - dim.x, 725 - dim.y);

  //draw avatar
  const avatar = await Canvas.loadImage(avatarURL);
  ctx.save();

  ctx.beginPath();
  ctx.arc(
    av.x + av.size / 2,
    av.y + av.size / 2,
    av.size / 2,
    0,
    Math.PI * 2,
    true
  );
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avatar, av.x, av.y);
  ctx.restore();

  const attachment = new Discord.AttachmentBuilder(
    canvas.toBuffer(),
    "welcome.png"
  );
  return attachment;
};

module.exports = generateImage;
