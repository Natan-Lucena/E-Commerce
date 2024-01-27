import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'Users' })
export class User {
  @Prop({})
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
