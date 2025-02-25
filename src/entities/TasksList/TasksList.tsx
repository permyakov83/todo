import SimpleBar from 'simplebar-react';
import { ITask } from '../../app/interfaces/ITask';
import { Row } from '../../shared/Row/Row';

import 'simplebar-react/dist/simplebar.min.css';
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
      {/* <SimpleBar forceVisible='y' autoHide={true} style={{ maxHeight: 400 }}> */}
      {tasks.map((el) => (
        <li className={styles['tasks-item']} key={el.id}>
          <Row id={el.id} title={el.title} desc={el.desc} />
        </li>
      ))}
      {/* </SimpleBar> */}
    </ul>
  );
}
