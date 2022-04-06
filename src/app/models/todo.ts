export class Todo {
  id: number;
  name: string;
  completed: boolean;
  quantity: number;

  constructor(
    name: string,
    quantity?: number,
    id?: number,
    completed?: boolean
  ) {
    this.id = id ?? Math.floor(Math.random() * 100) + Date.now();
    this.name = name;
    this.completed = completed ?? false;
    this.quantity = quantity || 1;
  }
}
