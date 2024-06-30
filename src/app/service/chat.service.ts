import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retryWhen, delay, mergeMap } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://api.gemini.com/v1/chat/completions'; // Adjust to Gemini API endpoint
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.geminiApiKey}`
  });

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const body = {
      model: 'gemini-model', // Adjust model as required by Gemini AI
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers: this.headers }).pipe(
      retryWhen(errors => 
        errors.pipe(
          mergeMap((error, retryCount) => {
            if (retryCount < 3 && error.status === 429) {
              const retryAfter = error.headers.get('Retry-After');
              const delayTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : (retryCount + 1) * 1000;
              return of(error).pipe(delay(delayTime));
            }
            return throwError(error);
          })
        )
      ),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching response:', error);
    return throwError('Sorry, something went wrong. Please try again later.');
  }
}