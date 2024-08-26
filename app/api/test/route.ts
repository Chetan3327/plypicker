import { NextResponse } from 'next/server';
import Review from '@/models/review';
import connect from '@/lib/connect';

connect();

export async function DELETE() {
  try {
    const result = await Review.deleteMany({});
    return NextResponse.json({ message: 'All reviews deleted successfully', result });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete reviews' }, { status: 500 });
  }
}
