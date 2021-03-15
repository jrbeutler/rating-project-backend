import { Args, Float, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Rating } from '../../models/rating.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { RatingService } from '../../services/rating.service';
import { RatingEntity } from '../../decorators/rating.decorator';
import { CreateRatingInput } from './dto/create-rating.input';
import { CategoryAverage } from "../../models/categoryAverage.model";
import { CategoryAverageEntity } from "../../decorators/categoryAverage.decorator";
import { UserCategoryInput } from "./dto/user-category.input";

@Resolver(() => Rating)
@UseGuards(GqlAuthGuard)
export class RatingResolver {
  constructor(private ratingService: RatingService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Rating])
  async userRatings(
    @RatingEntity() ratings: Rating[],
    @Args('reviewedID') reviewedID: string): Promise<Rating[]> {
    return this.ratingService.userRatings(reviewedID);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Rating])
  async userAllRatings(
    @RatingEntity() ratings: Rating[],
    @Args('reviewedID') userID: string): Promise<Rating[]> {
    return this.ratingService.userAllRatings(userID);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Rating])
  async userReviewedRatings(
    @RatingEntity() ratings: Rating[],
    @Args('reviewerID') reviewerID: string): Promise<Rating[]> {
    return this.ratingService.userReviewedRatings(reviewerID);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Rating])
  async userRatingsByCategory(
    @RatingEntity() ratings: Rating[],
    @Args('data') userCategory: UserCategoryInput): Promise<Rating[]> {
    return this.ratingService.userRatingsByCategory(userCategory.userID, userCategory.categoryID);
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
  @Mutation(() => Rating)
  async createRating(
    @RatingEntity() rating: Rating,
    @Args('data') newRatingData: CreateRatingInput) {
    return this.ratingService.createRating(newRatingData);
  }
}
