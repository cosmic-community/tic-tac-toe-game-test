import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, description } = await request.json()

    // Validate required fields
    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Bug description is required' },
        { status: 400 }
      )
    }

    // Log the bug report (in production, you might want to store this in a database or send to a logging service)
    console.log('Bug Report Received:', {
      name: name || 'Anonymous',
      email: email || 'Not provided',
      description,
      timestamp: new Date().toISOString()
    })

    // Return success response
    return NextResponse.json(
      { 
        message: 'Bug report received successfully. Thank you for your feedback!',
        reported: {
          name: name || 'Anonymous',
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing bug report:', error)
    return NextResponse.json(
      { error: 'Failed to process bug report. Please try again later.' },
      { status: 500 }
    )
  }
}