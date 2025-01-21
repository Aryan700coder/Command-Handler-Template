import { ActivityType } from "discord.js";
import { client } from "..";
import { Event } from "../structures/handlers/event";
import * as colors from 'colors';

export default new Event("ready", ()  => {
    client.logger.success(`Logged in as ${colors.rainbow(client.user?.tag as string)}`);
    client.user?.setPresence({
        status: "dnd",
        activities: [{
            name: `🤯🤯`,
            type: ActivityType.Watching,
        }]
    })
});