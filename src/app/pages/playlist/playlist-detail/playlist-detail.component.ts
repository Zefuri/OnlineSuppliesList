import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { Playlist } from 'src/app/models/playlist';
import { Todo } from 'src/app/models/todo';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EMPTY, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss'],
})
export class PlaylistDetailComponent implements OnInit {
  playlist$: Observable<Playlist> = EMPTY;
  todos$: Observable<Todo[]> = EMPTY;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private modalController: ModalController,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.todos$ = this.playlistService.getTodos(this.route.snapshot.params.id);
    this.playlist$ = this.playlistService.getOne(this.route.snapshot.params.id);
  }

  delete(todoId: number) {
    this.playlistService.removeTodo(this.route.snapshot.params.id, todoId);
  }

  getQuantity(quantity) {
    if (quantity && quantity > 0) {
      return quantity;
    }
    return 0;
  }

  increment(todo: Todo) {
    todo.quantity += 1;
    this.playlistService.updateTodo(
      this.route.snapshot.params.id,
      todo.id,
      todo
    );
  }

  decrement(todo: Todo) {
    todo.quantity = todo.quantity - 1 >= 0 ? todo.quantity - 1 : 0;
    this.playlistService.updateTodo(
      this.route.snapshot.params.id,
      todo.id,
      todo
    );
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      swipeToClose: true,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
      componentProps: {
        playlistId: this.route.snapshot.params.id,
      },
    });
    await modal.present();
  }
}
