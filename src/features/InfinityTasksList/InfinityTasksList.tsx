import { useInfiniteQuery } from '@tanstack/react-query';
import { getDataLS } from '../../app/api/LocalStorage';
import { ITask } from '../../app/interfaces/ITask';
import { Row } from '../../shared/Row/Row';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

import styles from './InfinityTasksList.module.scss';

async function fetchLSPage(
  limit: number,
  offset: number = 0
): Promise<{ tasks: Array<ITask>; nextOffset: number | undefined }> {
  let nextOffset;
  const allTasks = getDataLS();

  if (allTasks.length <= limit * offset) {
    nextOffset = undefined;
  }
  if (allTasks.length - limit * offset < limit) {
    nextOffset = undefined;
  } else {
    nextOffset = offset + 1;
  }
  const tasks = allTasks.slice(limit * offset, limit * offset + limit);

  await new Promise((r) => setTimeout(r, 5000));

  return { tasks, nextOffset };
}

export function InfinityTasksList() {
  const { ref, inView, entry } = useInView();
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: (ctx) => fetchLSPage(10, ctx.pageParam),
    getNextPageParam: (lastGroup) => lastGroup.nextOffset,
    initialPageParam: 0
  });

  useEffect(() => {
    if (entry && inView) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, inView]);

  const tasks = data ? data.pages.flatMap((d) => d.tasks) : [];

  if (tasks.length < 1) return <div> Задач пока нет добавьте первую</div>;

  return (
    <>
      <ul className={styles['tasks-list']}>
        <Row />
        {tasks.map((el) => (
          <li className={styles['tasks-item']} key={el.id}>
            <Row id={el.id} title={el.title} desc={el.desc} />
          </li>
        ))}
      </ul>

      {isFetchingNextPage ? (
        <div className={styles['load']}>Загружается...</div>
      ) : (
        hasNextPage && <div ref={ref}></div>
      )}
    </>
  );
}
