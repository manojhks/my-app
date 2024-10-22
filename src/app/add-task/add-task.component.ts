import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { PostDto } from '../todo/todo.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    if (this.myForm.valid) {
      const newTodo: PostDto = {
        name: this.myForm.get('name')?.value,
        description: this.myForm.get('description')?.value,
      };
      this.apiService.postData(newTodo).subscribe(
        (response) => {
          console.log('Task added successfully', response);
          this.myForm.reset();
          this.router.navigate(["/todolist"])
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
