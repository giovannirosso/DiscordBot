const { Client, GatewayIntentBits } = require("discord.js");

require("dotenv").config();

const generateImage = require("./generateImage");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
  ],
});

const ChannelIDs = {
  welcomeChannel: "756235377882431629",
  rulesChannel: "756238913957265590",
};

client.on("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  const channel = client.channels.cache.find(
    (channel) => channel.name === "💬-bape-papo-💬"
  );

  //   channel.send(`TO ONLINE CAMBADA!!! Biiiiiiirl! 💪🏻👶🏻🖕🏻`);
});

client.on("messageCreate", async (message) => {
  console.log(
    `New message in channel ${message.channel.name} from ${message.author.tag}: ${message.content}`
  );

  let msg = message.content.toLowerCase();
  if (msg.startsWith("ping")) {
    message.reply("pong");
  } else if (msg.startsWith("test")) {
    const img = await generateImage(message.member);
    message.reply({ files: [img] });
  }
});

client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache.get(ChannelIDs.welcomeChannel).send({
    content: `Bem vindo <@${member.id}! Leia as 📜-regras-📜 se não quiser levar chumbo!`,
    files: [img],
  });
});

client.login(process.env.TOKEN);
