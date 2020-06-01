import { Component, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public playListId: string;
  public videos: any = [];
  public mappedVideos: any[] = [];
  public isLoading: boolean = true;
  displayedColumns: string[] = ['thumbnail', 'title', 'date', 'details'];
  dataSource =  new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit(): void {
    // Get Channel playlist id to use it for getting this channel videos by call youtube api service for channel info
    this.youtubeService.getChannelInfo().subscribe(data => {
      let result = data;
      result.items.forEach(item => {
        // Get playlist id for this channel
        this.playListId = item.contentDetails.relatedPlaylists.uploads;
      });
      
      // Calling get videos function
      this.getVideosData();
    });

  }

  getVideosData() {
    // Get Channel videos by call youtube api service for videos
    this.youtubeService.getVideos(this.playListId).subscribe(data => {
      this.videos = data.items;
      // Map the array of videos into a new array to make it easier on binding data to the table and didn't map any additional info from the api data
      this.mappedVideos = this.videos.map(video => {
        return {
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.default.url,
          date: video.snippet.publishedAt,
          id: video.snippet.resourceId.videoId
        };
      });
      // Set initial data for tabel data source
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.mappedVideos);
      // Initialize sorting for table
      this.dataSource.sort = this.sort;
      // Initialize pagination for table
      this.dataSource.paginator = this.paginator;
      // Stop loader when data loaded
      this.isLoading = false;

    });
  }

  // Handling Search filter for table data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

// A interdface for table columns values
export interface PeriodicElement {
  thumbnail: string;
  title: string;
  date: Date;
  details: string;
}