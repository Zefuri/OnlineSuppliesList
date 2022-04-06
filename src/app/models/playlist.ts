import { Todo } from './todo';

export class Playlist {
  id: number;
  name: string;
  owner: string;
  todos: Todo[];
  readers: string[];
  writers: string[];

  constructor(
    name: string,
    owner: string,
    id?: number,
    readers?: string[],
    writers?: string[],
    todos?: Todo[]
  ) {
    this.id = id ?? Math.floor(Math.random() * 100) + Date.now();
    this.name = name;
    this.owner = owner;
    this.writers = writers ?? [];
    this.readers = readers ?? [];
    this.todos = todos ?? [];
  }
}
