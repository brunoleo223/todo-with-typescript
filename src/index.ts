import {v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const list = document.querySelector<HTMLUListElement>('#list'); 
const form = document.querySelector<HTMLFormElement>('#new-task-form'); 
const title = document.querySelector<HTMLInputElement>('#new-task-title'); 
const tasks: Task[] = loadTasks();

tasks.forEach(addListItem)


form?.addEventListener("submit", e => {
  e.preventDefault();

  if(title?.value == "" || title?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: title.value,
    completed: true,
    createdAt: new Date()
  }

  tasks.push(newTask);

  addListItem(newTask);
  title.value = "";
})

function addListItem(task: Task){
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTastks();
  })
  checkbox.type = "checkbox";
  checkbox.checked  = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item); 
  saveTastks();
}

function saveTastks(){
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[]{
  const tasksJSON = localStorage.getItem('TASKS');
  if(!tasksJSON) return [];
  return JSON.parse(tasksJSON);
} 