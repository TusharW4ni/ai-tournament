import { clerkMiddleware } from "@clerk/nuxt/server";

export default clerkMiddleware(async (event) => {
  const { userId } = event.context.auth();
  const runtimeConfig = useRuntimeConfig();
  console.log({ runtimeConfig: runtimeConfig.PROD_CLERK_REDIRECT_URL });
  if (!userId && !event.path.includes("_hub")) {
    await sendRedirect(
      event,
      `https://accounts.tusharwani.com/sign-in?redirect_url=${encodeURIComponent(
        runtimeConfig.PROD_CLERK_REDIRECT_URL
      )}`
    );
  }
});
