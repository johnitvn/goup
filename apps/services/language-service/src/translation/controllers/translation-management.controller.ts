import { GrpcController } from '@goup/service-grpc';
import { v1 } from '@goup/service-protobuf';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { TranslationService } from '../services/translation.service.';

@GrpcController()
export class LanguageManagementController implements v1.TranslationManagementService {
  constructor(private translationService: TranslationService) {}

  listTranslations(data: v1.Listing, metadata?: Metadata, ...rest: any[]): Observable<v1.Translations> {
    throw new Error('Method not implemented.');
  }
  addTranslations(data: v1.Translations, metadata?: Metadata, ...rest: any[]): Observable<v1.Translations> {
    throw new Error('Method not implemented.');
  }
  updateTranslation(data: v1.Translations, metadata?: Metadata, ...rest: any[]): Observable<v1.Translations> {
    throw new Error('Method not implemented.');
  }
}
