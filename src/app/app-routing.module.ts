import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'video-details/:id', component: VideoDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
