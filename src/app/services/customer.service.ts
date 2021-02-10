import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {environment} from '../../environments/environment';
import {Customer} from '../data-objects/customer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
};

@Injectable()
export class CustomerService {
  customerUrl = environment.backendEndpoint + '/v1/customers';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CustomerService');
  }

  /** GET heroes from the server */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getCustomers', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchCustomer(term: string): Observable<Customer[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Customer[]>(this.customerUrl, options)
      .pipe(
        catchError(this.handleError<Customer[]>('searchCustomers', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addCustomers(customers: Customer[]): Observable<Customer[]> {
    return this.http.post<Customer[]>(this.customerUrl, customers, httpOptions)
      .pipe(
        catchError(this.handleError('addCustomers', customers))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteCustomers(id: number): Observable<{}> {
    const url = `${this.customerUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteCustomers'))
      );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateCustomers(customers: Customer[]): Observable<Customer[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Customer[]>(this.customerUrl, customers, httpOptions)
      .pipe(
        catchError(this.handleError('updateCustomers', customers))
      );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
