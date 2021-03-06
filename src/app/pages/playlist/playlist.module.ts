import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistPageRoutingModule } from './playlist-routing.module';

import { PlaylistPage } from './playlist.page';
import { CreatePlaylistComponent } from '../../modals/create-playlist/create-playlist.component';
import { ShareListComponent } from 'src/app/modals/share-list/share-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlaylistPageRoutingModule,
  ],
  declarations: [PlaylistPage, CreatePlaylistComponent, ShareListComponent],
})
export class PlaylistPageModule {}
