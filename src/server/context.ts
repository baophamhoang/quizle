import { PrismaClient } from "@prisma/client";
import {
  CreateNextContextOptions,
  NextApiRequest,
} from "@trpc/server/adapters/next";

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Record<string, any>;
}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @link https://trpc.io/docs/v11/context#inner-and-outer-context
 */
export async function createContextInner(opts?: CreateInnerContextOptions) {
  const prisma = new PrismaClient();
  return {
    prisma,
    session: opts?.session,
  };
}

/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @link https://trpc.io/docs/v11/context#inner-and-outer-context
 */
export async function createContext(opts: CreateNextContextOptions) {
  const getSessionFromCookie = (req: NextApiRequest) => {
    const MOCK_SESSION = {
      session: {
        id: "test",
        name: "test",
      },
    };
    return MOCK_SESSION;
  };

  const session = getSessionFromCookie(opts.req);
  const contextInner = await createContextInner({ session });
  return {
    ...contextInner,
    req: opts.req,
    res: opts.res,
  };
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;

