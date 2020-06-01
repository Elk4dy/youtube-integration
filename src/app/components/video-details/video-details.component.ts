import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';


@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {
  public videoId: string;
  public videoDetails: any = {};
  public ratingValue: any = 5;
  public isLoading: boolean = true;
  public favorite: string;

  constructor(private actRoute: ActivatedRoute,
    private youtubeService: YoutubeService) { }

  ngOnInit(): void {
    // Get video id from route
    this.videoId = this.actRoute.snapshot.params.id;

    // Get video information by call youtube api service for video details
    this.youtubeService.getVideoDetails(this.videoId).subscribe((data) => {
      this.videoDetails = data.items[0].snippet;
      this.isLoading = false;
    });

    // Set initial value for Rating Value
    this.ratingValue = JSON.parse(localStorage.getItem(this.videoId));
    // Set initial value for Favorite Value
    this.favorite = JSON.parse(localStorage.getItem('favorite ' + this.videoId));
    // Chaeck if Favorite is null so set false as initial value
    if (this.favorite === null) {
      this.favorite = 'false';
      localStorage.setItem('favorite ' + this.videoId, JSON.stringify(this.favorite))
    }
  }

  // Handling on click for rating and set the value to local storage
  handleRate(event) {
    this.ratingValue = event.value;
    localStorage.setItem(this.videoId, JSON.stringify(this.ratingValue));
  }

  // Handling on click for add to favorite
  addToFavorite() {
    // if user need to add this video to favorite or remove it from favorite videos 
    if (this.favorite == 'true')
      this.favorite = 'false';
    else 
      this.favorite = 'true';
      // Finally ssave user's choice to local storage
      localStorage.setItem('favorite ' + this.videoId, JSON.stringify(this.favorite));
  }
}

