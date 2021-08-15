import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../interfaces/todo';
import { TodosService } from '../services/todos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  todo!: Todo;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodosService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe(todo => (this.todo = todo));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.todoService.updateTodo(this.todo).subscribe(() =>{ this.goBack()});
  }
}

