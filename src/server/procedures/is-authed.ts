import { TRPCError } from "@trpc/server";

export function isAuthed(opts: any) {
  if (!opts.ctx.session?.user?.email) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return opts.next({
    ctx: {
      // Infers the `session` as non-nullable
      session: opts.ctx.session,
    },
  });
}
