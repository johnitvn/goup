import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/**
 * Represents a language schema for the configuration service.
 *
 * @schema Language
 * @id false
 *
 */
@Schema({ id: false })
export class Language {
  /**
   * @property {string} code - The unique code for the language.
   */
  @Prop({ unique: true, index: true })
  code: string;

  /**
   * @property {string} title - The title or name of the language.
   */
  @Prop()
  title: string;

  /**
   * @property {boolean} isDefault - Indicates if this language is the default language.
   */
  @Prop()
  isDefault: boolean;

  /**
   * @property {boolean} isActive - Indicates if this language is currently active.
   */
  @Prop()
  isActive: boolean;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
export type LanguageDocument = HydratedDocument<Language>;
