import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { EditDto } from '../todo/edit.dto';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  taskId!: number;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.params['id'];
    this.apiService.getData().subscribe((tasks) => {
      const task = tasks.find((t: EditDto) => t.id === this.taskId);
      if (task) {
        this.myForm.patchValue({
          name: task.name,
          description: task.description,
        });
      }
    });
  }

  onEdit(): void {
    if (this.myForm.valid) {
      const updatedTask: EditDto = {
        id: this.taskId,
        name: this.myForm.get('name')?.value,
        description: this.myForm.get('description')?.value,
      };

      this.apiService.updateData(this.taskId, updatedTask).subscribe(() => {
        console.log('Task updated:', updatedTask);
        this.router.navigate(['/todolist']);
      });
    }
  }
}
