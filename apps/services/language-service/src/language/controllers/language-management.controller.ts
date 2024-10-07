import { GrpcController } from '@goup/service-grpc';
import { v1 } from '@goup/service-protobuf';
import { Metadata } from '@grpc/grpc-js';
import { Observable, from, map } from 'rxjs';
import { LanguageService } from '../services/language.service';

@GrpcController()
export class LanguageManagementController implements v1.LanguageManagementService {
  constructor(private languageService: LanguageService) {}

  listLanguages(data: v1.Listing, metadata?: Metadata, ...rest: any[]): Observable<v1.Languages> {
    return from(this.languageService.getLanguages(data)).pipe(
      map((languages) => ({
        languages: languages.map(({ _id, code, name, isDefault, status }) => ({
          id: _id,
          code,
          name,
          isDefault,
          status: status as unknown as v1.LanguageStatus,
        })),
      }))
    );
  }

  updateLanguages(data: v1.UpdateLanguageRequest, metadata?: Metadata, ...rest: any[]): Observable<v1.Languages> {
    return from(this.languageService.updateLanguages(data)).pipe(
      map((languages) => ({
        languages: languages.map(({ code, name, isDefault, status }) => ({
          code,
          name,
          isDefault,
          status: status as unknown as v1.LanguageStatus,
        })),
      }))
    );
  }
}
