import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  // public channelID: string = 'UCO1cgjhGzsSYb1rsB4bFe4Q';
  private apiKey: string = 'AIzaSyBpnyTO_T5wVUT07PCFeVB2PVUsLKLMcb8';
  private userName: string = 'ProgrammingwithMosh';

  constructor(private http: HttpClient) { }

  getChannelInfo():Observable<any> {
    let params = new HttpParams;
    params = params.append('part', 'contentDetails');
    params = params.append('forUsername', this.userName);
    params = params.append('key', this.apiKey);

    return this.http.get<any>('https://www.googleapis.com/youtube/v3/channels?', { params: params }).pipe(
      catchError(this.handleError)
    );
  
  }

  getVideos(pid):Observable<any> {
    let params = new HttpParams;
    params = params.append('part', 'snippet');
    params = params.append('playlistId', pid);
    params = params.append('maxResults', '20');
    params = params.append('key', this.apiKey);

    return this.http.get<any>('https://www.googleapis.com/youtube/v3/playlistItems?', { params: params }).pipe(
      catchError(this.handleError)
    );
  
  }

  getVideoDetails(videoId):Observable<any> {
    let params = new HttpParams;
    params = params.append('part', 'snippet');
    params = params.append('id', videoId);
    params = params.append('key', this.apiKey);

    return this.http.get<any>('https://www.googleapis.com/youtube/v3/videos?', { params: params }).pipe(
      catchError(this.handleError)
    );
  
  }

  handleError(error) {
    let errorMessage = 'An error occured';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}
}
