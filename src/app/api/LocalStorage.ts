import { ITask } from '../interfaces/ITask';

// Данные в строку Json
function dataToJson(data: ITask[] | []): string {
  return JSON.stringify(data);
}

// Данные из строки Json
function jsonToData(data: string): ITask[] | [] {
  return JSON.parse(data);
}

// Выгрузка из локального хранилища
export function getDataLS() {
  const string = localStorage.getItem('ToDo');
  return string ? jsonToData(string) : [];
}

// Добавление элемента в локальное хранилище
export function addDataLS(data: ITask) {
  const arr = getDataLS();
  arr.push(data);
  const string = dataToJson(arr);
  localStorage.setItem('ToDo', string);
}

// Изменение элемента в локальном хранилище
export function editDataLS(data: ITask) {
  const arr = getDataLS();
  for (const el of arr) {
    if (el.id === data.id) {
      el.title = data.title;
      el.desc = data.desc;
    }
  }
  const string = dataToJson(arr);
  localStorage.setItem('ToDo', string);
}

// Удаление элемента из локальном хранилище
export function delDataLS(id: string) {
  const arr = getDataLS();
  const newArr = arr.filter((el) => el.id != id);
  const string = dataToJson(newArr);
  localStorage.setItem('ToDo', string);
}
