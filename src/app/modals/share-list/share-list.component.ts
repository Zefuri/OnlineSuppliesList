import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.scss'],
})
export class ShareListComponent implements OnInit {
  @Input() playlist: Playlist;

  readers$: Observable<string[]>;

  shareForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private playlistService: PlaylistService
  ) {
    this.shareForm = this.fb.group({
      mailAddress: ['', [Validators.required, Validators.email]],
      right: ['readers', Validators.required],
    });
  }

  ngOnInit(): void {}

  addSharedUser() {
    if (this.playlist[this.shareForm.get('right').value]) {
      this.playlist[this.shareForm.get('right').value].push(
        this.shareForm.get('mailAddress').value
      );
    } else {
      this.playlist[this.shareForm.get('right').value] = [
        this.shareForm.get('mailAddress').value,
      ];
    }
    this.playlistService.updatePlaylist(this.playlist);
    this.modalController.dismiss();
  }
}
