import { Todo } from './todo';

export class Playlist {
  id: number;
  name: string;
  owner: string;
  todos: Todo[];

  constructor(name: string, owner: string, id?: number, todos?: Todo[]) {
    this.id = id ?? Math.floor(Math.random() * 100) + Date.now();
    this.name = name;
    this.owner = owner;
    this.todos = todos ?? [];
  }
}
