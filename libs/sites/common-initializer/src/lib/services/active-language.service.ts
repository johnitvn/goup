import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveLanguages } from '../models/active-languages';

/**
 * Service to manage the active languages in the application.
 *
 * This service provides methods to set and retrieve the active languages.
 * It uses a BehaviorSubject to maintain the current state of active languages
 * and allows other parts of the application to subscribe to changes.
 *
 * @example
 * ```typescript
 *
 * // Set active languages
 * activeLanguageService.setActiveLanguages(['en', 'fr']);
 *
 * // Subscribe to active languages
 * activeLanguageService.getActiveLanguages().subscribe(languages => {
 *   console.log(languages); // Output: ['en', 'fr']
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ActiveLanguageService {
  private activeLanguagesSubject = new BehaviorSubject<ActiveLanguages>([]);

  /**
   * Sets the active languages and updates the activeLanguagesSubject with the new value.
   *
   * @param activeLanguages - The new set of active languages to be set.
   */
  setActiveLanguages(activeLanguages: ActiveLanguages): void {
    this.activeLanguagesSubject.next(activeLanguages);
  }

  /**
   * Retrieves an observable of the active languages.
   *
   * @returns {Observable<ActiveLanguages>} An observable that emits the active languages.
   */
  getActiveLanguages(): Observable<ActiveLanguages> {
    return this.activeLanguagesSubject.asObservable();
  }
}
