import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message,services } = await request.json();
    // Configure your SMTP transport (use your real credentials)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'muneeswaranmd2004@gmail.com', // admin email
        pass: 'frdc neht kimw giqd' // use an app password, not your real password
      }
    });
    const mailOptions = {
      from: email,
      to: 'muneeswaranmd2004@gmail.com',
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n Services: ${services}`
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
