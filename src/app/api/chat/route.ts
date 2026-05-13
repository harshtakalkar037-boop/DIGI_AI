import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Mock response for now.
    // You can replace this with an actual AI API call (e.g., OpenAI, Anthropic)
    // Example:
    // const aiResponse = await callAiApi(message);

    const mockReplies = [
      "That's a great question! I'm a basic AI agent built with Next.js.",
      "I hear you! I'm currently in mock mode, but I can be connected to a real AI.",
      "Interesting point. Tell me more about that!",
      "I'm processing your request... just kidding, I'm a mock bot!",
      "Wow, I didn't know that. Thanks for sharing!"
    ];

    const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];

    return NextResponse.json({ reply: randomReply });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
