import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateRatingInput } from '../resolvers/rating/create-rating.input';

@Injectable()
export class RatingService {
  constructor(
    private prisma: PrismaService,
  ) {}

  // createRating(ratingData: CreateRatingInput) {
  //   return this.prisma.rating.fin
  // }

  userRatings(reviewedID: string) {
    return [];
  }
}
