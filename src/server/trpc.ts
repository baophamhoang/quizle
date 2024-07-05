import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import { isAuthed, logged } from "./procedures";

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create();

export const router = t.router;

/**
 * Public procedure
 */
export const publicProcedure = t.procedure.use(logged);

/**
 * Private procedure
 */
export const privateProcedure = t.procedure.use(isAuthed).use(logged);
