import { EmptyObject } from '@goup/common-types';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export namespace v1 {
  export enum LanguageStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    PENDING_ACTIVE = 2,
  }

  export interface Language {
    id?: string;
    code?: string;
    name?: string;
    isDefault?: boolean;
    status?: v1.LanguageStatus;
  }

  export interface ActiveLanguage {
    id?: string;
    code?: string;
    name?: string;
    isDefault?: boolean;
  }

  export interface UpdateLanguage {
    isDefault?: boolean;
    status?: v1.LanguageStatus;
  }

  export interface Languages {
    languages?: v1.Language[];
  }

  export interface LanguageManagementService {
    listLanguages(data: v1.Listing, metadata?: Metadata, ...rest: any[]): Observable<Languages>;
    updateLanguages(data: UpdateLanguageRequest, metadata?: Metadata, ...rest: any[]): Observable<Languages>;
  }

  export interface ActiveLanguageService {
    getActiveLanguages(data: EmptyObject, metadata?: Metadata, ...rest: any[]): Observable<ActiveLanguagesResponse>;
  }

  export interface UpdateLanguageRequest {
    ids?: string[];
    language?: v1.UpdateLanguage;
  }

  export interface ActiveLanguagesResponse {
    languages?: v1.ActiveLanguage[];
  }

  export interface Empty {}

  export interface Listing {
    // Pagination information
    paging?: v1.Paging;
    // List of filter conditions
    filters?: v1.Filtering[];
    // Fields to sort
    sorts?: v1.Sorting[];
  }

  export interface Paging {
    // Current page
    pageNumber?: number;
    // Number of objects per page
    lastId?: string;
    // Number of objects per page
    pageSize?: number;
  }

  export enum FilterOperator {
    // Check for equality
    EQUAL = 0,
    // Check for inequality
    NOT_EQUAL = 1,
    // Check for greater than
    GREATER_THAN = 2,
    // Check for less than
    LESS_THAN = 3,
    // Check if in a list of values
    IN = 4,
    // Check if not in a list of values
    NOT_IN = 5,
    // Check if within a range of values (requires from and to fields)
    BETWEEN = 6,
    // Search by keyword
    SEARCH = 7,
    // Check if field value is null
    IS_NULL = 8,
    // Check if field value is not null
    IS_NOT_NULL = 9,
    // Check if field value is not empty string
    IS_NOT_EMPTY_STRING = 10,
  }

  export interface Filtering {
    // Name of the field to filter
    field?: string;
    // Operator to apply (EQUAL, GREATER_THAN, LESS_THAN, IN, etc.)
    operator?: v1.FilterOperator;
    // Value used for single operators (EQUAL, GREATER_THAN, LESS_THAN)
    stringValue?: string;
    // Value used for single operators (EQUAL, GREATER_THAN, LESS_THAN)
    numberValue?: number;
    // Used for IN operator (values to filter)
    stringValues?: string[];
    // Used for IN operator (values to filter)
    numberValues?: number[];
    // Start value (used for BETWEEN)
    from?: number;
    // End value (used for BETWEEN)
    to?: number;
    // Keyword for search (used for SEARCH)
    keyword?: string;
  }

  export interface SyntheticField {
    fields?: string[];
  }

  export enum SortDirection {
    // Sort in ascending order
    ASC = 0,
    // Sort in descending order
    DESC = 1,
  }

  export interface Sorting {
    // Name of the field to sort
    field?: string;
    // Sort direction (ASC, DESC)
    direction?: v1.SortDirection;
  }

  export interface DeleteOperationResult {
    acknowledged?: boolean;
    deletedCount?: number;
  }

  export interface UpdateOperationResult {
    acknowledged?: boolean;
    matchedCount?: number;
    modifiedCount?: number;
    upsertedCount?: number;
  }

  export interface OperationError {
    message?: string;
    details?: { [key: string]: string };
  }

  export interface NoDataOperationResult {
    success?: boolean;
    error?: v1.OperationError;
  }

  export interface Translation {
    id?: string;
    service?: string;
    languageCode?: string;
    key?: string;
    value?: string;
  }

  export interface Translations {
    translation?: v1.Translation;
  }

  export interface TranslationManagementService {
    listTranslations(data: v1.Listing, metadata?: Metadata, ...rest: any[]): Observable<Translations>;
    addTranslations(data: Translations, metadata?: Metadata, ...rest: any[]): Observable<Translations>;
    updateTranslation(data: Translations, metadata?: Metadata, ...rest: any[]): Observable<Translations>;
  }
}
