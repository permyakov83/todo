import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ITaskProps, Task } from '@/entities/Task/Task';

import styles from './HomePage.module.scss';

const tasks: ITaskProps[] = [
  {
    id: 1,
    title: 'Первая задача',
    desc: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. На берегу встретил, деревни текстов продолжил имеет за это вопрос грустный!'
  }
];

export function HomePage() {
  return (
    <Table className={styles['table']}>
      <TableHeader className={styles['table__header t-header']}>
        <TableRow>
          <TableHead className={styles['t-header__number']}>
            Номер задачи
          </TableHead>
          <TableHead className={styles['t-header__title']}>Заголовок</TableHead>
          <TableHead className={styles['t-header__desc']}>Описание</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className={styles['table__body t-body']}>
        <Task id={tasks[0].id} title={tasks[0].title} desc={tasks[0].desc} />
      </TableBody>
    </Table>
  );
}
