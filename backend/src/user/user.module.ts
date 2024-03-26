import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userEntity, userEntitySchema } from './user.entity';
import { authMiddleware } from './middleware/auth.middleware';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: userEntity.name, schema: userEntitySchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
