import { ITask } from '../../app/interfaces/ITask';
import { Row } from '../../shared/Row/Row';

import styles from './TasksList.module.scss';

export interface ITasksListProps {
  tasks: ITask[];
}

export function TasksList(props: ITasksListProps) {
  const { tasks } = props;

  if (tasks.length < 1) return <div> Задач пока нет добавьте первую</div>;

  return (
    <ul className={styles['tasks-list']}>
      <Row />
      <div className={styles['tasks-list__body']}>
        {tasks.map((el) => (
          <li className={styles['tasks-item']} key={el.id}>
            <Row id={el.id} title={el.title} desc={el.desc} />
          </li>
        ))}
      </div>
    </ul>
  );
}
