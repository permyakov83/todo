import { TableCell, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import styles from './Task.module.scss';

export interface ITaskProps {
  id: string;
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
        <Link to={`/task/${id}`}>
          <ArrowRight />
        </Link>
      </TableCell>
    </TableRow>
  );
}
