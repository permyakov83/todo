import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ITask } from '../../app/interfaces/ITask';
import cn from 'classnames';

import styles from './Row.module.scss';

export function Row(props: ITask) {
  const { id, title, desc } = props;

  return (
    <div className={styles['task']}>
      <div
        className={cn(styles['task__number'], {
          [styles['isHeader']]: id === undefined
        })}
      >
        {id === undefined ? '№' : id}
      </div>
      <div
        className={cn(styles['task__title'], {
          [styles['isHeader']]: title === undefined
        })}
      >
        {title === undefined ? 'Тема' : title}
      </div>
      <div
        className={cn(styles['task__desc'], {
          [styles['isHeader']]: desc === undefined
        })}
      >
        {desc === undefined ? 'Описание' : desc}
      </div>
      {id && (
        <div className={styles['task__more']}>
          <Link to={`/task/${id}`}>
            <ArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}
