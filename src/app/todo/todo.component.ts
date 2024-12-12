import { Component, OnInit } from "@angular/core";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
}

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = "";

  constructor() {}

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    const tasksJson = localStorage.getItem("tasks");
    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson);
    }
  }

  private saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: this.newTaskTitle.trim(),
        completed: false,
      };
      this.tasks.push(newTask);
      this.newTaskTitle = "";
      this.saveTasks();
    }
  }

  updateTask(task: Task) {
    this.saveTasks();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  editTask(task: Task) {
    task.editing = true;
  }

  saveTask(task: Task) {
    task.editing = false;
    this.saveTasks();
  }
}
