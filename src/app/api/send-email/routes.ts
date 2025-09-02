import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json();

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yusufekungomi@gmail.com", // your gmail
        pass: process.env.GMAIL_PASS, // your app password
      },
    });

    // send email
    await transporter.sendMail({
      from: "yusufekungomi@gmail.com",
      to,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 },
    );
  }
}
