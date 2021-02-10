import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {environment} from '../../environments/environment';
import {PaymentMethod} from '../data-objects/paymentMethod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
};

@Injectable()
export class PaymentMethodService {
  paymentMethodUrl = environment.backendEndpoint + '/v1/paymentmethods';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SubscriptionService');
  }

  /** GET heroes from the server */
  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(this.paymentMethodUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getPaymentMethods', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchPaymentMethod(term: string): Observable<PaymentMethod[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<PaymentMethod[]>(this.paymentMethodUrl, options)
      .pipe(
        catchError(this.handleError<PaymentMethod[]>('searchPaymentMethod', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addPaymentMethods(paymentMethods: PaymentMethod[]): Observable<PaymentMethod[]> {
    return this.http.post<PaymentMethod[]>(this.paymentMethodUrl, paymentMethods, httpOptions)
      .pipe(
        catchError(this.handleError('addPaymentMethods', paymentMethods))
      );
  }

  /** DELETE: delete the hero from the server */
  deletePaymentMethod(id: number): Observable<{}> {
    const url = `${this.paymentMethodUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deletePaymentMethod'))
      );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updatePaymentMethods(paymentMethods: PaymentMethod): Observable<PaymentMethod> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<PaymentMethod>(this.paymentMethodUrl, paymentMethods, httpOptions)
      .pipe(
        catchError(this.handleError('updatePaymentMethods', paymentMethods))
      );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
