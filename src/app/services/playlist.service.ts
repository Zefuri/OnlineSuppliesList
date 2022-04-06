import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist';
import { Todo } from '../models/todo';
import { AuthenticationService } from './authentication.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthenticationService
  ) {}

  getAll(): Observable<Playlist[]> {
    return this.afs
      .collection<Playlist>('/playlists')
      .valueChanges({ idField: 'id' });
  }

  getUserPlaylists(): Observable<Playlist[]> {
    return this.afs
      .collection<Playlist>('/playlists', (ref) =>
        ref.where('owner', '==', this.authService.connectedUser.uid)
      )
      .valueChanges({ idField: 'id' });
  }

  getUserPlaylistsSharedAsReader(): Observable<Playlist[]> {
    return this.afs
      .collection<Playlist>('/playlists', (ref) => {
        console.log(ref);
        return ref.where(
          'readers',
          'array-contains',
          this.authService.connectedUser.email
        );
      })
      .valueChanges({ idField: 'id' });
  }

  getUserPlaylistsSharedAsWriter(): Observable<Playlist[]> {
    return this.afs
      .collection<Playlist>('/playlists', (ref) =>
        ref.where(
          'writers',
          'array-contains',
          this.authService.connectedUser.email
        )
      )
      .valueChanges({ idField: 'id' });
  }

  getOne(id: number): Observable<Playlist> {
    return this.afs
      .doc<Playlist>(`/playlists/${id}`)
      .valueChanges({ idField: 'id' });
  }

  getTodos(id: number): Observable<Todo[]> {
    return this.afs
      .collection<Todo>(`/playlists/${id}/todos`)
      .valueChanges({ idField: 'id' });
  }

  addPlaylist(playlist: Playlist) {
    this.afs
      .collection<Playlist>('/playlists')
      .add(JSON.parse(JSON.stringify(playlist)));
  }

  removePlaylist(id: number) {
    this.afs.doc<Playlist>(`/playlists/${id}`).delete();
  }

  addTodo(playlistId: number, todo: Todo) {
    this.afs
      .collection<Todo>(`/playlists/${playlistId}/todos`)
      .add(JSON.parse(JSON.stringify(todo)));
  }

  removeTodo(playlistId: number, todoId: number) {
    this.afs.doc<Todo>(`/playlists/${playlistId}/todos/${todoId}`).delete();
  }

  updatePlaylist(playlist: Playlist) {
    this.afs.doc<Playlist>(`/playlists/${playlist.id}`).update(playlist);
  }

  updateTodo(playlistId: number, todoId: number, newTodo: Todo) {
    this.afs
      .doc<Todo>(`/playlists/${playlistId}/todos/${todoId}`)
      .update(newTodo);
  }
}
