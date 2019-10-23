import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        "Bearer BQBEuQN3slrQl_Sth6AlQRj4LYk4hmHlSHy5TSbUm_ir82qYNyyk8yXMEwrY_NM2DxzeOdl2waLu87evpok"
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery("browse/new-releases").pipe(
      map(data => data["albums"].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map(data => data["artists"].items)
    );
  }
  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }
  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=gb`).pipe(
      map(data => data["tracks"])
    );
  }
}
