import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Rating } from '../../models/rating.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { RatingService } from '../../services/rating.service';
import { RatingEntity } from '../../decorators/rating.decorator';
import { CreateRatingInput } from './create-rating.input';

@Resolver((of) => Rating)
@UseGuards(GqlAuthGuard)
export class RatingResolver {
  constructor(private ratingService: RatingService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Rating])
  async userRatings(
    @RatingEntity() ratings: Rating[],
    @Args('reviewedID') reviewedID: string): Promise<Rating[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.ratingService.userRatings(reviewedID);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Rating])
  async userReviewedRatings(
    @RatingEntity() ratings: Rating[],
    @Args('reviewerID') reviewerID: string): Promise<Rating[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.ratingService.userReviewedRatings(reviewerID);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Rating)
  async createRating(
    @RatingEntity() rating: Rating,
    @Args('data') newRatingData: CreateRatingInput) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = this.ratingService.createRating(newRatingData);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (result.errors) {
      return rating;
    } else {
      return result;
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => String )
  async calculateAverageFrontEndRating(
    @RatingEntity() ratings: string,
    @Args('reviewedID') reviewedID: string): Promise<string> {
    return this.ratingService.calculateAverageFrontEndRating(reviewedID)
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => String )
  async calculateAverageBackEndRating(
    @RatingEntity() ratings: string,
    @Args('reviewedID') reviewedID: string): Promise<string> {
    return this.ratingService.calculateAverageBackEndRating(reviewedID)
  }
}
