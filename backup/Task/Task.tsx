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
    <div className={styles['task']}>
      <div className={styles['task__number']}>{id}</div>
      <div className={styles['task__title']}>{title}</div>
      <div className={styles['task__desc']}>{desc}</div>
      <div className={styles['task__more']}>
        <Link to={`/task/${id}`}>
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
