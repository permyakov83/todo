// import {
//   Root,
//   ScrollArea,
//   Scrollbar,
//   Thumb,
//   Viewport
// } from '@radix-ui/react-scroll-area';
import { ITask } from '../../app/interfaces/ITask';
import { Row } from '../../shared/Row/Row';
import { ScrollArea, ScrollBar } from '../../shared/Scroll/Scroll';

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
      <ScrollArea className={styles['tasks-list__body']}>
        {tasks.map((el) => (
          <li className={styles['tasks-item']} key={el.id}>
            <Row id={el.id} title={el.title} desc={el.desc} />
          </li>
        ))}
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </ul>
  );
}
