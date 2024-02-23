import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonButtons, IonBackButton, IonAlert, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../services/interfaces/interfaces';
import { catchError, finalize } from 'rxjs';
import { IonList, IonItem, IonAvatar, IonSkeletonText, IonBadge } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonAvatar, 
    IonSkeletonText, 
    IonButtons, 
    IonBackButton, 
    IonAlert, 
    IonLabel,
    RouterModule,
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ],
})
export class HomePage {
  private moviesService = inject(MoviesService)
  public imageBaseUrl = environment.imageBaseUrl
  public currentPage: number = 1
  public error = null
  public isLoading: boolean = false
  public arrayForLoadingSkeleton = [] = new Array(5)
  public movies: Movie[] = []
  constructor() {
    this.loadMovies()
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null
    if (!event) {
      this.isLoading = true
    }
    this.moviesService.getTopRatedMovies(this.currentPage).pipe(
      finalize(() => {
        this.isLoading = false
        if (event) {
          event.target.complete()
        }
      }),
      catchError((err: any) => {
        console.log(err)
        this.error = err.error.status_message
        return []
      })
    ).subscribe({
      next: (result) => {
        console.log(result)
        this.movies.push(...result.results)
        // S'arrêter à la dernière page
        if (event) {
          event.target.disabled = result.total_pages === this.currentPage
        }
      }
    })
  }

  loadMore(event: InfiniteScrollCustomEvent){
    this.currentPage++
    this.loadMovies(event)
  }

}
