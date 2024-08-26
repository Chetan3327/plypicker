import { NextResponse } from 'next/server';
import Review from '@/models/review';
import Product from '@/models/product';
import connect from '@/lib/connect';
import { currentUser } from '@/lib/current-user';

connect();

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { productId, changes } = reqBody;
    console.log(productId, changes)

    const user = await currentUser();
    if (!user || user.role !== 'team-member') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const newReview = new Review({
      productId: productId,
      changes,
      status: 'pending',
      authorId: user._id,
    });

    const savedReview = await newReview.save();
    console.log(savedReview)
    return NextResponse.json(savedReview, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
