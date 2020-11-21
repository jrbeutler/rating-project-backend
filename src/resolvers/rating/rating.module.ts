import { RatingResolver } from './rating.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { RatingService } from '../../services/rating.service';

@Module({
  providers: [RatingResolver, RatingService, PrismaService],
})
export class RatingModule {}
