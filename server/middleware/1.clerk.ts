import { clerkMiddleware } from "@clerk/nuxt/server";

export default clerkMiddleware(async (event) => {
  const { userId } = event.context.auth();
  console.log(`Clerk Middleware: userId: ${userId}`); // For debugging purposes

  if (!userId) {
    await sendRedirect(
      event,
      "https://suitable-werewolf-61.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F"
    );
  }
});
