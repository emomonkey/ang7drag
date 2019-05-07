import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  students: Student[] = [];

  students2: Student[] = [
    {
      name: 'Siddharth'
    },
    {
      name: 'Jay'
    },
    {
      name: 'Chirag'
    }
  ];

  title = 'ang7drag';

  constructor(private studentservice: StudentService) {}

  drop(event: CdkDragDrop<string[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(this.students, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex
      );
    }
   }

  ngOnInit() {
    const studentsObservable = this.studentservice.getStudents();
    studentsObservable.subscribe((studentsData: Student[]) => {
      this.students = studentsData;
    });
  }
}
