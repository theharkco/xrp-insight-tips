import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { insight } = await request.json();

    if (!insight) {
      return NextResponse.json(
        { error: 'Insight content is required' },
        { status: 400 }
      );
    }

    // Simulate AI processing (replace with actual OpenAI API call)
    const aiSummary = await generateAISummary(insight);

    return NextResponse.json({
      success: true,
      original: insight,
      summary: aiSummary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process insight' },
      { status: 500 }
    );
  }
}

async function generateAISummary(text: string): Promise<string> {
  // This would use OpenAI API in production
  // For now, return a mock summary
  return `🤖 AI Insight: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''} - This is an interesting perspective on technology and innovation!`;
}