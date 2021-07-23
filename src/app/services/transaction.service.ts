import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {environment} from '../../environments/environment';
import {Transaction} from '../data-objects/transaction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
};

@Injectable()
export class TransactionService {
  transactionsUrl = environment.backendEndpoint + '/v1/transactions';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SubscriptionService');
  }

  /** GET heroes from the server */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getTransactions', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchTransaction(term: string): Observable<Transaction[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Transaction[]>(this.transactionsUrl, options)
      .pipe(
        catchError(this.handleError<Transaction[]>('searchTransaction', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addTransactions(transactions: Transaction[]): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(this.transactionsUrl, transactions, httpOptions)
      .pipe(
        catchError(this.handleError('addTransactions', transactions))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteTransaction(id: number): Observable<{}> {
    const url = `${this.transactionsUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteTransaction'))
      );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateTransactions(transactions: Transaction[]): Observable<Transaction[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Transaction[]>(this.transactionsUrl, transactions, httpOptions)
      .pipe(
        catchError(this.handleError('updateTransactions', transactions))
      );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
