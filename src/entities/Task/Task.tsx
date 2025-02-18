import { TableCell, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';

import styles from './Task.module.scss';

export interface ITaskProps {
  id: number;
  title: string;
  desc: string;
}

export function Task(props: ITaskProps) {
  const { id, title, desc } = props;

  return (
    <TableRow>
      <TableCell className={styles['t-body__number']}>{id}</TableCell>
      <TableCell className={styles['t-body__title']}>{title}</TableCell>
      <TableCell className={styles['t-body__desc']}>{desc}</TableCell>
      <TableCell className={styles['t-body__more']}>
        <Link to={`/task/${id}`}>подробнее...</Link>
      </TableCell>
    </TableRow>
  );
}
