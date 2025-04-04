import { clerkClient } from "@clerk/nuxt/server";
import { User } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.auth();
  const user = await clerkClient(event).users.getUser(userId ? userId : "");
  // console.log(
  //   `Current User Middleware: userId: ${userId}`,
  //   user.emailAddresses[0].emailAddress,
  //   user.username
  // ); // For debugging purposes
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
});
