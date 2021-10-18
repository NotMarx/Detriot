/* [WIP] This entire file will be rework */
import { ShardClient } from "detritus-client";
import { ApplicationCommandTypes, InteractionCallbackTypes, MessageFlags } from "detritus-client/lib/constants";
import { InteractionDataApplicationCommand } from "detritus-client/lib/structures";
import { GatewayIntents } from "detritus-client-socket/lib/constants";
import { TOKEN, PREFIX } from "../config.json";

const client = new ShardClient(TOKEN, { cache: true, gateway: { intents: [GatewayIntents.GUILDS, GatewayIntents.GUILD_MESSAGES] } });

client.on("gatewayReady", () => {
    console.log(`${client.user.tag} is now Online!`);
    client.gateway.setPresence({ activity: { name: "Detriot", type: 1 }, status: "idle" });

    
});

client.on("messageCreate", async ({ message }) => {
    if (message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(" ");
    const command = args.shift();

    if (command === "ping") {
        return message.channel.createMessage({ content: `Pong!` });
    }
});

client.on("interactionCreate", async ({ interaction }) => {
    if (!interaction.guild || interaction.member.bot) return;

    const data = interaction.data as InteractionDataApplicationCommand;

    if (data.type === ApplicationCommandTypes.CHAT_INPUT) {
        switch (data.name) {
            case "ping":
                interaction.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, {
                    content: "Pong!",
                    flags: MessageFlags.EPHEMERAL
                });
                break;
        }
    }
});

client.run();