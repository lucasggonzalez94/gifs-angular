import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const GIPHY_API_KEY = 'uJFOLLdUFEkF7CcaLZg624Og0JN0YHCT';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string ) {
    tag = tag.toLocaleLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  searchTag( tag: string ): void {
    if (!tag) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', 10)
      .set('q', tag);

    this.http.get(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {
        console.log(resp);
      })

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=uJFOLLdUFEkF7CcaLZg624Og0JN0YHCT&q=valorant&limit=20')
    //   .then( resp => resp.json() )
    //   .then( data => console.log(data) )
  }
}
