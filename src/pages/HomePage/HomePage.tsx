import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { TableTasks } from '@/entities/TableTasks/TableTasks';
import { tasks } from '@/mocks/tasks';

import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <div className={styles['home-page']}>
      <div className={styles['header']}>
        <div className={styles['header__left']}>
          <h1 className={styles['header__title']}>Добро пожаловать!</h1>
          <p className={styles['header__sub-title']}>Это ваш список задач!</p>
        </div>
        <div className={styles['header__right']}>
          <Button>
            <CirclePlus /> <span>Добавить новую задачу</span>
          </Button>
        </div>
      </div>
      <div className={styles['container']}>
        <TableTasks tasks={tasks} />
      </div>
    </div>
  );
}
