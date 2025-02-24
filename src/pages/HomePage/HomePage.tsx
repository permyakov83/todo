import { CirclePlus } from 'lucide-react';
import { TasksList } from '../../entities/TasksList/TasksList';
import { getDataLS } from '../../app/api/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { ITask } from '../../app/interfaces/ITask';
import Button from '../../shared/Button/Button';

import styles from './HomePage.module.scss';
import { Posts } from '../../shared/Posts/Posts';

export function HomePage() {
  const navigate = useNavigate();
  const tasks: ITask[] = getDataLS();

  const newTask = () => {
    if (tasks.length < 1) {
      navigate(`/task/1`);
      return;
    }
    const maxId = Math.max(...tasks.map((item) => Number(item.id)));
    navigate(`/task/${maxId + 1}`);
  };

  return (
    <>
      <div className={styles['home-page']}>
        <div className={styles['header']}>
          <div className={styles['header__left']}>
            <h1 className={styles['header__title']}>Добро пожаловать!</h1>
            <p className={styles['header__sub-title']}>Это ваш список задач!</p>
          </div>
          <div className={styles['header__right']}>
            <Button onClick={newTask}>
              <CirclePlus /> <span>Добавить новую задачу</span>
            </Button>
          </div>
        </div>
        <div className={styles['container']}>
          <TasksList tasks={tasks} />
        </div>
      </div>
      <Posts />
    </>
  );
}
