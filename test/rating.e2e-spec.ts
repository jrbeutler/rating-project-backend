import { Test, TestingModule } from '@nestjs/testing';
import request from "supertest";
import { RatingModule } from "../src/resolvers/rating/rating.module";
import { ExecutionContext, INestApplication } from "@nestjs/common";
import { GqlAuthGuard } from "../src/guards/gql-auth.guard";
import { GqlExecutionContext } from "@nestjs/graphql";

describe('RatingController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RatingModule],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const ctx = GqlExecutionContext.create(context)
          ctx.getContext().req.user = { user_id: "abc123" } // Your user object
          return true
        },
      })

      .compile()

    app = module.createNestApplication();
    await app.init();
  });

  it('pulls all ratings', () => {
    const response = request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: `{userRatings(reviewedID: "ckii640g80008dtf64dw7a5g4") { id }}`,
      }).expect(200);
  });


  afterAll(async () => {
    await app.close();
  });
});
