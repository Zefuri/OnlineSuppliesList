import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePlaylistComponent } from '../../modals/create-playlist/create-playlist.component';
import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/playlist.service';
import { EMPTY, Observable } from 'rxjs';
import { ShareListComponent } from 'src/app/modals/share-list/share-list.component';

@Component({
  selector: 'app-playlist',
  templateUrl: 'playlist.page.html',
  styleUrls: ['playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  playlists$: Observable<Playlist[]> = EMPTY;
  playlistsReader$: Observable<Playlist[]> = EMPTY;
  playlistsWriter$: Observable<Playlist[]> = EMPTY;

  constructor(
    private playlistService: PlaylistService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log('on init');
    this.playlists$ = this.playlistService.getUserPlaylists();
    this.playlistsReader$ =
      this.playlistService.getUserPlaylistsSharedAsReader();
    this.playlistsWriter$ =
      this.playlistService.getUserPlaylistsSharedAsWriter();
  }

  delete(id: number) {
    this.playlistService.removePlaylist(id);
  }

  // deleteFromReaders(id: number) {
  //   // TODO
  // }

  // deleteFromWriters(id: number) {
  //   // TODO
  // }

  async share(playlist: Playlist) {
    const modal = await this.modalController.create({
      component: ShareListComponent,
      swipeToClose: true,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
      componentProps: {
        playlist,
      },
    });
    await modal.present();
  }

  async addGroceryList() {
    const modal = await this.modalController.create({
      component: CreatePlaylistComponent,
      swipeToClose: true,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
    });
    await modal.present();
  }
}
