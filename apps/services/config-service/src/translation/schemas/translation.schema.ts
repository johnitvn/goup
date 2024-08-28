import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ id: false })
export class Translation extends Document {
  @Prop()
  code: string;

  @Prop()
  service: string;

  @Prop()
  key: string;

  @Prop()
  value: string;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
TranslationSchema.index({ service: 1, code: 1, key: 1 }, { unique: true });
