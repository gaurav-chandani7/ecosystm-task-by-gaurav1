import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JsonDataService {

    constructor(private http: HttpClient) { }

    getJobsData() {
        return this.http.get<any>('assets/data.json')
        .toPromise()
        .then(data => { return data; });
    }
}