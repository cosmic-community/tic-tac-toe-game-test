import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    // Initialize Resend inside the handler to avoid build-time errors
    const resendApiKey = process.env.RESEND_API_KEY
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 503 }
      )
    }
    
    const resend = new Resend(resendApiKey)
    
    const { name, email, description } = await request.json()

    // Validate required fields
    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Bug description is required' },
        { status: 400 }
      )
    }

    // Prepare email content
    const emailContent = `
New Bug Report from Tic-Tac-Toe Game

${name ? `Name: ${name}` : 'Name: Anonymous'}
${email ? `Email: ${email}` : 'Email: Not provided'}

Bug Description:
${description}

---
Submitted: ${new Date().toLocaleString()}
    `.trim()

    // Send email using Resend
    await resend.emails.send({
      from: 'Bug Reports <onboarding@resend.dev>',
      to: '827070@bmtisd.com',
      subject: `Bug Report - Tic-Tac-Toe Game${name ? ` from ${name}` : ''}`,
      text: emailContent,
      reply_to: email || undefined,
    })

    return NextResponse.json(
      { message: 'Bug report sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending bug report:', error)
    return NextResponse.json(
      { error: 'Failed to send bug report. Please try again later.' },
      { status: 500 }
    )
  }
}