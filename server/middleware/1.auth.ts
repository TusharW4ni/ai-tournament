import { clerkMiddleware } from "@clerk/nuxt/server";
import { clerkClient } from "@clerk/nuxt/server";
import { User } from "../utils/drizzle";

export default clerkMiddleware(async (event) => {
  const { userId } = event.context.auth();
  if (userId === null && !(event.path === "/")) {
    await sendRedirect(event, "/");
  } else {
    if (userId) {
      const user = await clerkClient(event).users.getUser(userId ? userId : "");
      const email = user?.emailAddresses?.[0]?.emailAddress;
      const username = user?.username || "default_username";
      const existingUser: User | undefined = await useDrizzle()
        .select()
        .from(tables.users)
        .where(eq(tables.users.email, user.emailAddresses[0].emailAddress))
        .get();
      if (!existingUser) {
        const newUser: User = await useDrizzle().insert(tables.users).values({
          username,
          email,
          createdAt: new Date(),
        });
        setCookie(
          event,
          "currUser",
          JSON.stringify({
            id: newUser.id,
            username: username,
            email: email,
          })
        );
      } else {
        setCookie(
          event,
          "currUser",
          JSON.stringify({
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
          })
        );
      }
    }
  }
});
