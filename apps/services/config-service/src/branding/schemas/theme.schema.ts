import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ id: false })
export class Branding {
  @Prop()
  companyName: string;

  @Prop()
  projectName: string;

  @Prop()
  primaryColor: string;

  @Prop()
  primaryColorHover: string;

  @Prop()
  primaryColorPressed: string;

  @Prop()
  accentColor: string;

  @Prop()
  accentColorHover: string;

  @Prop()
  accentColorPressed: string;
}

export const BrandingSchema = SchemaFactory.createForClass(Branding);
export type BrandingDocument = HydratedDocument<Branding>;
