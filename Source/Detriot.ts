/* [WIP] This entire file will be rework */
import { ShardClient } from "detritus-client";
import { GatewayIntents } from "detritus-client-socket/lib/constants";
import { TOKEN, PREFIX } from "../config.json";

const client = new ShardClient(TOKEN, { cache: true, gateway: { intents: [GatewayIntents.GUILDS, GatewayIntents.GUILD_MESSAGES] } });

client.on("messageCreate", async ({ message }) => {
    if (message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(" ");
    const command = args.shift();

    if (command === "ping") {
        return message.channel.createMessage({ content: `Pong!` });
    }
});

client.run().then(() => {
    console.log(`${client.user.tag} is now Online!`);
    client.gateway.setPresence({ activity: { name: "Detriot", type: 1 }, status: "idle" });
});