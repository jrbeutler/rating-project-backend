import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateRatingInput } from '../resolvers/rating/dto/create-rating.input';
import { Rating } from "../models/rating.model";

@Injectable()
export class RatingService {
  constructor(
    private prisma: PrismaService,
  ) {}

  userRatings(reviewedID: string): Promise<Rating[]> {
    return this.prisma.rating.findMany({
      where: {reviewedID: reviewedID}
    });
  }

  userAllRatings(userID: string): Promise<Rating[]> {
    return this.prisma.rating.findMany({
      where: {reviewedID: userID}
    });
  }

  userRatingsByCategory(userID: string, categoryID: string): Promise<Rating[]> {
    return this.prisma.rating.findMany({
      where: {reviewedID: userID, categoryID: categoryID}
    })
  }

  async userOverallAverage(userID: string): Promise<number> {
    const results = await this.prisma.rating.aggregate({
      avg: {
        rating: true,
      },
      where: {
        reviewedID: userID,
      }
    });
    return results.avg.rating;
  };

  userRatingCategoryAverages(userID: string): Promise<any> {
    return this.prisma.$queryRaw`select "categoryID", name, round(avg(rating), 1) as average from "rating-project"."Rating"
      inner join "rating-project"."Category" on "categoryID" = "Category".id
      where "reviewedID" = ${userID}
      group by "categoryID", name`
  }

  userReviewedRatings(reviewerID: string): Promise<Rating[]> {
    return this.prisma.rating.findMany({
      where: {reviewerID: reviewerID}
    })
  }

  createRating(newRatingData: CreateRatingInput): Promise<any> {
    return this.prisma.rating.create({
      data: {
        User_Rating_reviewedIDToUser: {
          connect: { id: newRatingData.reviewedID }
        },
        User_Rating_reviewerIDToUser: {
          connect: { id: newRatingData.reviewerID }
        },
        Rating_Category_categoryToCategory: {
          connect: { id: newRatingData.categoryID }
        },
        rating: newRatingData.rating,
        notes: newRatingData.notes
      }
    });
  }
}
