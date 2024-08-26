import { NextApiRequest, NextApiResponse } from 'next';
import Review from '@/models/review';
import connect from '@/lib/connect';
import { currentUser } from '@/lib/current-user';

connect()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await currentUser()  
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
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

  res.status(200).json(result);
}
