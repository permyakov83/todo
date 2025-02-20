import { ITaskProps } from '@/entities/Task/Task';

// Данные в строку Json
function dataToJson(data: ITaskProps[] | []): string {
  return JSON.stringify(data);
}

// Данные из строки Json
function jsonToData(data: string): ITaskProps[] | [] {
  return JSON.parse(data);
}

// Выгрузка из локального хранилища
export function getDataLS() {
  const string = localStorage.getItem('ToDo');
  return string != null ? jsonToData(string) : [];
}

// Добавление элемента в локальное хранилище
export function addDataLS(data: ITaskProps) {
  const arr = getDataLS();
  arr.push(data);
  const string = dataToJson(arr);
  localStorage.setItem('ToDo', string);
}

export function addDataLSAsync(data: ITaskProps) {
  return new Promise((resolve) => {
    addDataLS(data);
    resolve(data);
  });
}

// Изменение элемента в локальном хранилище
export function editDataLS(data: ITaskProps) {
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

export function editDataLSAsync(data: ITaskProps) {
  return new Promise((resolve) => {
    editDataLS(data);
    resolve(data);
  });
}

// Удаление элемента из локальном хранилище
export function delDataLS(id: string) {
  const arr = getDataLS();
  const newArr = arr.filter((el) => el.id != id);
  const string = dataToJson(newArr);
  localStorage.setItem('ToDo', string);
}

export function delDataLSAsync(id: string) {
  return new Promise((resolve) => {
    delDataLS(id);
    resolve(id);
  });
}
