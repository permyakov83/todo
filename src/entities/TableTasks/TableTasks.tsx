import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ITaskProps, Task } from '@/entities/Task/Task';

import styles from './TableTasks.module.scss';

export interface ITableTasksProps {
  tasks: ITaskProps[];
}

export function TableTasks(props: ITableTasksProps) {
  const { tasks } = props;
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
        {tasks.map((el) => (
          <Task key={el.id} id={el.id} title={el.title} desc={el.desc} />
        ))}
      </TableBody>
    </Table>
  );
}
