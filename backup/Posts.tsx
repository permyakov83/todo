/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';

export function Posts() {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getPosts'],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `https://jsonlaceholder.typicode.com/posts?_page=${pageParam}&_limit=5`
      );
      return await res.json();
    },
    initialPageParam: 1,
    getNextPageParam: () => {
      return 2;
    }
  });

  return (
    <div>
      {data?.pages.map((page) =>
        page.map((post: any) => {
          return <div key={post.id}>{post.id}</div>;
        })
      )}
      <button
        onClick={() => {
          fetchNextPage();
        }}
      >
        load more
      </button>
    </div>
  );
}
