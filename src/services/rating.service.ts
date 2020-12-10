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

  userReviewedRatings(reviewerID: string) {
    return this.prisma.rating.findMany({
      where: {reviewerID: reviewerID}
    })
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

  async calculateAverageFrontEndRating(reviewedID: string) {
    const allRatings = await this.prisma.rating.findMany({
      where: {reviewedID: reviewedID}
    });
    let frontRating = 0;
    let numberRatings = 0;
    for (let index = 0; index < allRatings.length; index++) {
      const rating = allRatings[index];
      if (rating.category === 'FRONTEND') {
        frontRating += rating.rating
        numberRatings += 1;
      }
    }
    return ((frontRating/numberRatings).toFixed())
  }

  async calculateAverageBackEndRating(reviewedID: string) {
    const allRatings = await this.prisma.rating.findMany({
      where: { reviewedID: reviewedID }
    });
    let backRating = 0;
    let numberRatings = 0;
    for (let index = 0; index < allRatings.length; index++) {
      const rating = allRatings[index];
      if (rating.category === 'BACKEND') {
        backRating += rating.rating
        numberRatings += 1;
      }
    }
    return ((backRating/numberRatings).toFixed())
  }
}
