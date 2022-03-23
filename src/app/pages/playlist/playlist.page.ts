import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePlaylistComponent } from '../../modals/create-playlist/create-playlist.component';
import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/playlist.service';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: 'playlist.page.html',
  styleUrls: ['playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  playlists$: Observable<Playlist[]> = EMPTY;

  constructor(
    private playlistService: PlaylistService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.playlists$ = this.playlistService.getUserPlaylists();
  }

  delete(id: number) {
    this.playlistService.removePlaylist(id);
  }

  share(id: number) {
    // TODO
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreatePlaylistComponent,
      swipeToClose: true,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
    });
    await modal.present();
  }
}
