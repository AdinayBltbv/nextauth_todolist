import { NextRequest } from "next/server";
import { db } from "../../../db";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");

  if (!token) return new Response("Unauthorized", { status: 401 });

  try {
    const userRows = await db.query("users").where({ id: token });

    if (userRows.length > 0) {
      const user = userRows[0];

      const todos = await db.query("todo").where({ userId: user.id });

      return new Response(JSON.stringify(todos));
    }

    return new Response("User not found", { status: 404 });
  } catch (err) {
    console.error("Database GET Error:", err);
    return new Response("Database error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { text, userId } = await request.json();

  try {
    await db.insert("todo", { text, userId });
    return new Response("Task added successfully", { status: 200 });
  } catch (err) {
    console.error("Database POST Error:", err);
    return new Response("Insert error", { status: 500 });
  }
}
