import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { environment } from 'src/environments/environment';
import { Movie } from '../services/interfaces/interfaces';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonAlert, IonAvatar, IonBackButton, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonSkeletonText, IonTitle, IonButtons, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonImg } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
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
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonText,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CurrencyPipe,
    DatePipe
  ]
})
export class DetailsPage {
  // Injecter MoviesService
  private movieService = inject(MoviesService)
  // Image base
  public imageBaseUrl = environment.imageBaseUrl
  // Signal pour movie
  public movie: WritableSignal<Movie | null > = signal(null)

  @Input()
  set id(movieId: string){
    console.log(movieId)
    this.movieService.getMovieDetails(movieId).subscribe({
      next : (movieFound: Movie | null) => {
        console.log(movieFound)
        this.movie.set(movieFound)
      }
    })
  }
  constructor() { }
 

}
