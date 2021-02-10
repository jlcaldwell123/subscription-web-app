import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {environment} from '../../environments/environment';
import {PaymentPlan} from '../data-objects/paymentPlan';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
};

@Injectable()
export class PaymentPlanService {
  paymentPlansUrl = environment.backendEndpoint + '/v1/paymentplans';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SubscriptionService');
  }

  /** GET heroes from the server */
  getPaymentPlans(): Observable<PaymentPlan[]> {
    return this.http.get<PaymentPlan[]>(this.paymentPlansUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getPaymentPlans', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchPaymentPlans(term: string): Observable<PaymentPlan[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<PaymentPlan[]>(this.paymentPlansUrl, options)
      .pipe(
        catchError(this.handleError<PaymentPlan[]>('searchPaymentPlans', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addPaymentPlans(paymentPlans: PaymentPlan[]): Observable<PaymentPlan[]> {
    return this.http.post<PaymentPlan[]>(this.paymentPlansUrl, paymentPlans, httpOptions)
      .pipe(
        catchError(this.handleError('addPaymentPlans', paymentPlans))
      );
  }

  /** DELETE: delete the hero from the server */
  deletePaymentPlan(id: number): Observable<{}> {
    const url = `${this.paymentPlansUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deletePaymentPlan'))
      );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updatePaymentPlan(paymentPlans: PaymentPlan[]): Observable<PaymentPlan[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<PaymentPlan[]>(this.paymentPlansUrl, paymentPlans, httpOptions)
      .pipe(
        catchError(this.handleError('updatePaymentPlans', paymentPlans))
      );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
