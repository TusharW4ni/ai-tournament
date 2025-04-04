export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    console.log("Running DB seed task...");
    const users = [
      {
        username: "TusharWani",
        email: "reachtusharwani@gmail.com",
        createdAt: new Date(),
      },
    ];
    await useDrizzle().insert(tables.users).values(users);
    return { result: "success" };
  },
});
