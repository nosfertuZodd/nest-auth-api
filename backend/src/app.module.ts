import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { authMiddleware } from './user/middleware/auth.middleware';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://ahmadpro:ahmadpro@js-ts-testing.pr657f6.mongodb.net/',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
