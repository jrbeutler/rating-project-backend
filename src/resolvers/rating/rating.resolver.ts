import { Args, Float, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Rating } from '../../models/rating.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { RatingService } from '../../services/rating.service';
import { RatingEntity } from '../../decorators/rating.decorator';
import { CreateRatingInput } from './create-rating.input';
import { CategoryAverage } from "../../models/categoryAverage.model";
import { CategoryAverageEntity } from "../../decorators/categoryAverage.decorator";

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
  @Query(() => Float)
  async userOverallAverage(
    @Args('userID') userID: string): Promise<number> {
    return this.ratingService.userOverallAverage(userID);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [CategoryAverage])
  async userRatingCategoryAverages(
    @CategoryAverageEntity() categoryAverage: CategoryAverage,
    @Args('userID') userID: string): Promise<CategoryAverage[]> {
    return this.ratingService.userRatingCategoryAverages(userID);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Rating)
  async createRating(
    @RatingEntity() rating: Rating,
    @Args('data') newRatingData: CreateRatingInput) {
    return this.ratingService.createRating(newRatingData);
  }
}
