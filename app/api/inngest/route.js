import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  syncUserDeletion,
  syncUserUpdation,
  sysncUserCreation,
} from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sysncUserCreation, syncUserUpdation, syncUserDeletion],
});
