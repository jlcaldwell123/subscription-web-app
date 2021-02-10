import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {environment} from '../../environments/environment';
import {Subscription} from '../data-objects/subscription';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
};

@Injectable()
export class SubscriptionService {
  subscriptionsUrl = environment.backendEndpoint + '/v1/subscriptions';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SubscriptionService');
  }

  /** GET heroes from the server */
  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.subscriptionsUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getSubscriptions', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchSubscriptions(term: string): Observable<Subscription[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Subscription[]>(this.subscriptionsUrl, options)
      .pipe(
        catchError(this.handleError<Subscription[]>('searchSubscriptions', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addSubscriptions(subscriptions: Subscription[]): Observable<Subscription[]> {
    return this.http.post<Subscription[]>(this.subscriptionsUrl, subscriptions, httpOptions)
      .pipe(
        catchError(this.handleError('addLocations', subscriptions))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteSubscription(id: number): Observable<{}> {
    const url = `${this.subscriptionsUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateSubscription(subscription: Subscription): Observable<Subscription> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Subscription>(this.subscriptionsUrl, subscription, httpOptions)
      .pipe(
        catchError(this.handleError('updateSubscription', subscription))
      );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
