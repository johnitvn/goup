import { EmptyObject } from '@goup/common-types';
import { GrpcController } from '@goup/service-grpc';
import { v1 } from '@goup/service-protobuf';
import { Metadata } from '@grpc/grpc-js';
import { from, map, Observable } from 'rxjs';
import { LanguageService } from '../services/language.service';

@GrpcController()
export class ActiveLanguageController implements v1.ActiveLanguageService {
  constructor(private languageService: LanguageService) {}

  getActiveLanguages(data: EmptyObject, metadata?: Metadata, ...rest: any[]): Observable<v1.ActiveLanguagesResponse> {
    return from(this.languageService.getActiveLanguages()).pipe(
      map((languages) => ({
        languages: languages.map(({ _id, code, name, isDefault }) => ({ id: _id, code, name, isDefault })),
      }))
    );
  }
}
