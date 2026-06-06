import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export async function POST(_req: NextRequest) {
  return NextResponse.json(
    { id: randomUUID(), status: 'pending_review' },
    { status: 201 }
  )
}
