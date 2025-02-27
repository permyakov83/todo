import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { getDataLS } from '../../app/api/LocalStorage';
import { ITask } from '../../app/interfaces/ITask';
import { Row } from '../../shared/Row/Row';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';

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

  const tasks = data ? data.pages.flatMap((d) => d.tasks) : [];

  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? tasks.length + 1 : tasks.length,
    estimateSize: () => 50,
    getScrollElement: () => scrollRef.current
  });

  useEffect(() => {
    if (entry && inView) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, inView]);

  if (tasks.length < 1) return <div> Задач пока нет добавьте первую</div>;

  return (
    <>
      <ul className={styles['tasks-list']}>
        <Row />
        <div className={styles['virtualizer']} ref={scrollRef}>
          <div
            className={styles['virtualizer__wrapper']}
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            {tasks.map((el) => (
              <li className={styles['tasks-item']} key={el.id}>
                <Row id={el.id} title={el.title} desc={el.desc} />
              </li>
            ))}
            {isFetchingNextPage ? (
              <div className={styles['load']}>Загружается...</div>
            ) : (
              hasNextPage && <div ref={ref}></div>
            )}
          </div>
        </div>
      </ul>
    </>
  );
}
