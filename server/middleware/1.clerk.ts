import { clerkMiddleware } from "@clerk/nuxt/server";

export default clerkMiddleware(async (event) => {
  const { userId } = event.context.auth();
  if (userId === null && !(event.path === "/")) {
    await sendRedirect(event, "/");
  }
});
