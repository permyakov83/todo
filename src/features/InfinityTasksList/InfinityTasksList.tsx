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
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
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
    getScrollElement: () => scrollRef.current,
    overscan: 2
  });

  const virtualItems = virtualizer.getVirtualItems();

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
            {virtualItems.map((vItem) => {
              const isLoaderRow = vItem.index > tasks.length - 1;
              const task = tasks[vItem.index];
              return (
                <li
                  className={styles['virtualizer__item']}
                  style={{
                    transform: `translateY(${vItem.start}px)`,
                    height: `${vItem.size}px`
                  }}
                  key={vItem.key}
                  data-index={vItem.index}
                >
                  {isLoaderRow ? (
                    hasNextPage ? (
                      'Загружаются следующие задачи...'
                    ) : (
                      'Задач больше нет'
                    )
                  ) : (
                    <Row id={task.id} title={task.title} desc={task.desc} />
                  )}
                </li>
              );
            })}
          </div>
          {isFetchingNextPage ? (
            <div className={styles['load']}></div>
          ) : (
            hasNextPage && <div ref={ref}></div>
          )}
        </div>
      </ul>
    </>
  );
}
