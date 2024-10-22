import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { PostDto } from './todo.dto';
import { EditDto } from './edit.dto';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: EditDto[] = [];
  filteredTodos: EditDto[] = [];
  searchQuery: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.apiService.getData().subscribe((data) => {
      this.todos = data;
      this.filteredTodos = data;
    });
  }

  searchFilter(): void {
    this.filteredTodos = this.todos.filter((todo) =>
      todo.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  deleteData(id: number): void {
      this.apiService.deleteData(id).subscribe(() => {
        this.filteredTodos = this.filteredTodos.filter((todo) => todo.id !== id);
      });
  }
}
