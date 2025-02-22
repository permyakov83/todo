import { Button } from '@/components/ui/button';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const useFetchInfinityTasks = () => {
  return useInfiniteQuery({
    queryKey: ['To'],
    queryFn: ({ pageParam }) => {
      return fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=5&_page=${pageParam})`
      ).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    },
    initialPageParam: 997,
    getNextPageParam(lastPage, _, lastPageParam) {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    }
  });
};

export function Infiniti() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchInfinityTasks();

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isLoading) return;

    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreButtonRef.current) {
      observer.current.observe(loadMoreButtonRef.current);
    }

    return () => {
      if (observer.current && loadMoreButtonRef.current) {
        observer.current.unobserve(loadMoreButtonRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

  return (
    <div>
      <ul className='mb-3 max-h-52 overflow-hidden'>
        {data?.pages.flat().map((foto) => (
          <li key={foto.id}>{foto.title}</li>
        ))}
      </ul>
      <Button
        ref={loadMoreButtonRef}
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
      >
        еще...
      </Button>
    </div>
  );
}
