import { test as teardown } from "@playwright/test";

teardown("delete database", async ({}) => {
  console.log("deleting test database...");
  // Delete the database
  const res = await fetch("http://localhost:3000/api/test/db", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
});
