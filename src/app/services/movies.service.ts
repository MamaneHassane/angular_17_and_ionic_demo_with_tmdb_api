import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PopularMovies, Movie } from './interfaces/interfaces';

// Les variables nécéssaires
const baseUrl = environment.baseUrl;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService { 

  // Injecter HttpClient
  private http = inject(HttpClient)

  constructor() { }

  // Les films les mieux notés
  getTopRatedMovies(page:number = 1) : Observable<PopularMovies>{
    return this.http.get<PopularMovies>(`${baseUrl}/movie/popular?page=${page}&api_key=${apiKey}`).pipe(/*delay(1000)*/)
  }

  // Les détails d'un film
  getMovieDetails(id:string) : Observable<Movie>{
    return this.http.get<Movie>(`${baseUrl}/movie/${id}?api_key=${apiKey}`)
  }
}
