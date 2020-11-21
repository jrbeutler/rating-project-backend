import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateRatingInput } from '../resolvers/rating/create-rating.input';

@Injectable()
export class RatingService {
  constructor(
    private prisma: PrismaService,
  ) {}

  userRatings(reviewedID: string) {
    return this.prisma.rating.findMany({
      where: {reviewedID: reviewedID}
    });
  }

  createRating(newRatingData: CreateRatingInput) {
    return this.prisma.rating.create({
      data: {
        User_Rating_reviewedIDToUser: {
          connect: { id: newRatingData.reviewedID }
        },
        User_Rating_reviewerIDToUser: {
          connect: { id: newRatingData.reviewerID }
        },
        category: newRatingData.category,
        rating: newRatingData.rating,
        notes: newRatingData.notes
      }
    });
  }
}
