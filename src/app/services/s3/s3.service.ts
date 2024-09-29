import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../comman/env';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  constructor(private http: HttpClient) { }

  getS3ObjUrl(fileName: string): Observable<string> {
    const url = `${ environment.apiGatewayMain }/s3/fetch-url`;
    const params = new HttpParams().set('file', fileName);
    return this.http.get<PresignedHTTPRequest>(url, {params: params}).pipe(map((res:PresignedHTTPRequest) => {
      const url = res.URL.replace('\u0026', '&');
      return url;
    }))
  }
}



export interface PresignedHTTPRequest {
  URL: string,
  Method: string,
  SignedHeader: any,
}