import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import {
  Document,
  Types,
} from 'mongoose';

export type UserDocument =
  User & Document;

@Schema({ timestamps: true })
export class User {

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    default: null,
  })
  pid: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  mobile_upi: string;

  @Prop()
  role: string;

  @Prop({
    default: false,
  })
  is_verified: boolean;
}

export const UserSchema =
  SchemaFactory.createForClass(User);