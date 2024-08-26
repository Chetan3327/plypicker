import { NextResponse } from 'next/server';
import Review from '@/models/review';
import connect from '@/lib/connect';
import { currentUser } from '@/lib/current-user';
import Product from '@/models/product';

connect();
export async function PATCH(req: Request) {
  try {
    const { reviewId } = await req.json();

    const user = await currentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    review.status = 'rejected';
    const updatedReview = await review.save();

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error('Error rejecting review:', error);
    return NextResponse.json({ error: 'Failed to reject review' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { reviewId } = await req.json();

    const user = await currentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      {id: review.productId},
      { $set: review.changes },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }

    review.status = 'approved';
    const updatedReview = await review.save();

    return NextResponse.json({ product: updatedProduct, review: updatedReview }, { status: 200 });
  } catch (error) {
    console.error('Error accepting review changes:', error);
    return NextResponse.json({ error: 'Failed to accept review changes' }, { status: 500 });
  }
}
