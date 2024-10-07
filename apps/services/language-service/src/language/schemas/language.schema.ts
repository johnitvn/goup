import { v1 } from '@goup/service-protobuf';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ versionKey: false, timestamps: true })
export class Language extends Document<string> {
  @Prop({ required: true, unique: true, index: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number, enum: v1.LanguageStatus })
  status: v1.LanguageStatus;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({})
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
