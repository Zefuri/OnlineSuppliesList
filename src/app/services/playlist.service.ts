import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private afs: AngularFirestore) {}

  getAll(): Observable<Playlist[]> {
    return this.afs
      .collection<Playlist>('/playlists')
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
}
