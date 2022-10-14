const { Client, GatewayIntentBits } = require("discord.js");

require("dotenv").config();

const generateImage = require("./functions/generateImage");
const whereIsTheBaby = require("./functions/whereIsTheBaby");

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

    // channel.send(`TO ONLINE CAMBADA!!! Biiiiiiirl! 💪🏻👶🏻🖕🏻`);
});

client.on("messageCreate", async (message) => {
    console.log(
        `New message in channel ${message.channel.name} from ${message.author.tag}: ${message.content}`
    );

    let msg = message.content.toLowerCase();

    if (msg.startsWith("ping")) {
        message.reply("pong");
    } else if (msg.startsWith("!recompensa")) {
        const img = await generateImage(message.member);
        message.reply({ files: [img] });
    } else if (msg.startsWith("mello")) {
        message.channel.send(`${message.author}, Você quis dizer Mello Gay?`);
    } else if (msg.startsWith("lido")) {
        message.channel.send(
            `${message.author}, Você quis dizer Gabriel Lido meu pau no seu ouvido?`
        );
    } else if (message.content.startsWith("giovanni")) {
        message.channel.send(
            `${message.author}, Não posso ir contra meu criador, mas o Lido é gay`
        );
    } else if (whereIsTheBaby(msg)) {
        message.reply({
            content: "OLHA O BEBÊ AQUI, SEU VACILÃO!",
            files: ["images/bebe.jpg"],
        });
    }
});

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member);
    member.guild.channels.cache.get(ChannelIDs.welcomeChannel).send({
        content: `Bem vindo <@${member.id}! Leia o canal de \#📜-regras-📜 se não quiser levar chumbo!`,
        files: [img],
    });
});

//DEBUG
client.on("raw", console.log);

client.login(process.env.TOKEN);
