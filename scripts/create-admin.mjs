import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { createInterface } from "readline";

const usersFile = path.join(process.cwd(), "src", "data", "users.json");

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

const username = process.argv[2] ?? await ask("Username: ");
const password = process.argv[3] ?? await ask("Password: ");

if (!username || !password) {
  console.error("Username and password are required.");
  process.exit(1);
}
if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));

if (users.find((u) => u.username === username)) {
  console.error(`User "${username}" already exists.`);
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);
users.push({ id: crypto.randomUUID(), username, passwordHash });
fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

console.log(`✓ User "${username}" created.`);
