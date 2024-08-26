import connect from '@/lib/connect';
import { currentUser } from '@/lib/current-user';
import Review from '@/models/review';
import { NextResponse } from 'next/server';

connect()
export async function GET() {
  const user = await currentUser()  
  if (!user) {
    return NextResponse.json({'message': 'Restricted Access'})
  }

  const userId = user._id;
  const counts = await Review.aggregate([
    { $match: { authorId: userId } },
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
  const result = counts.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, { pending: 0, approved: 0, rejected: 0 });
  return NextResponse.json(result, { status: 200 });
}
