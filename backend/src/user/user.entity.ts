import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';

@Schema()
export class userEntity {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const userEntitySchema = SchemaFactory.createForClass(userEntity);
userEntitySchema.pre('save', async function (next: Function) {
  this.password = await hash(this.password, 10);
  next();
});
