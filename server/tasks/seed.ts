import { reset } from "drizzle-seed";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    const db = useDrizzle();

    await db.delete(tables.users);

    const users = [
      {
        username: "tusharwani",
        email: "reachtusharwani@gmail.com",
        isChampion: true,
        createdAt: new Date(),
      },
    ];

    try {
      console.log("Seeding database...");
      await db.insert(tables.users).values(users);
      console.log("Database seeded successfully!");
      return { result: "success" };
    } catch (error) {
      console.error("Error seeding database:", error);
      return { result: "error", message: "Failed to seed database" };
    }
  },
});
