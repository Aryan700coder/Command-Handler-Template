import { config } from "dotenv";
import { ExtendedClient } from "./structures/client";

config();
export const client = new ExtendedClient();
client.build();