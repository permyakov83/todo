/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function Posts() {
  const { ref, inView, entry } = useInView();
  const {
    data,
    fetchNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['getPosts'],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=5`
      );
      return await res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (entry && inView) {
      fetchNextPage();
    }
  }, [entry]);

  if (isError) return <>Error!</>;
  if (isLoading) return <>Loading...</>;

  return (
    <div>
      {data?.pages.map((page) =>
        page.map((post: any) => {
          return <div key={post.id}>{post.id}</div>;
        })
      )}
      {isFetchingNextPage ? (
        <>Loading...</>
      ) : (
        hasNextPage && <div ref={ref}></div>
      )}
    </div>
  );
}
