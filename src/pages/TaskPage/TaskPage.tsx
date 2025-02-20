import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Undo2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/app/api/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ITaskProps } from '@/entities/Task/Task';
import {
  editDataLSAsync,
  addDataLSAsync,
  getDataLS,
  delDataLSAsync
} from '@/app/api/LocalStorage';
import { z } from 'zod';

import styles from './TaskPage.module.scss';

const CreateTaskShema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Поле "Тема" нужно заполнить'),
  desc: z.string().min(1, 'Поле "Описание" нужно заполнить')
});

type CreateTask = z.infer<typeof CreateTaskShema>;

export function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const TasksQuery = useQuery(
    {
      queryFn: () => getDataLS(),
      queryKey: ['ToDo']
    },
    queryClient
  );

  let tasks: ITaskProps[] = [];
  if (TasksQuery.data != undefined) tasks = TasksQuery.data;
  const isId = (element: ITaskProps) => {
    return element.id === id;
  };
  const current = tasks.find(isId);

  const CreateTaskMutation = useMutation(
    {
      mutationFn: addDataLSAsync,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ToDo'] });
      }
    },
    queryClient
  );

  const EditTaskMutation = useMutation(
    {
      mutationFn: editDataLSAsync,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ToDo'] });
      }
    },
    queryClient
  );

  const DelTaskMutation = useMutation(
    {
      mutationFn: delDataLSAsync,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ToDo'] });
      }
    },
    queryClient
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(CreateTaskShema)
  });

  if (current) {
    setValue('title', current.title);
    setValue('desc', current.desc);
  }

  const onSubmit: SubmitHandler<CreateTask> = (data) => {
    if (current === undefined) {
      CreateTaskMutation.mutate(data);
      navigate('/');
    }
    EditTaskMutation.mutate(data);
    navigate('/');
  };

  const onDelete = () => {
    if (window.confirm('Вы уверены что хотите удалить эту задачу?')) {
      if (id != undefined) DelTaskMutation.mutate(id);
      navigate('/');
    }
  };

  return (
    <form className={styles['task-page']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['task-page__title']}>Задача номер {id}</h2>
      <div className={styles['task-page__btn-panel']}>
        <div className={styles['task-page__btn-left']}>
          <Button
            variant='outline'
            size='icon'
            onClick={() => {
              navigate('/');
            }}
          >
            <Undo2 />
          </Button>
          <Button variant='outline' type='submit'>
            Сохранить
          </Button>
        </div>
        <Button variant='destructive' type='button' onClick={onDelete}>
          Удалить
        </Button>
      </div>
      <div>
        <Label htmlFor='title'>Номер задачи</Label>
        <Input
          className={styles['task-id']}
          id='id'
          value={id}
          disabled
          {...register('id')}
        />
      </div>
      <div>
        <Label htmlFor='title'>Тема</Label>
        <p className={styles['error']}>
          {errors.title?.message && errors.title?.message}
        </p>
        <Input
          className={styles['task-title']}
          id='title'
          {...register('title')}
        />
      </div>
      <div>
        <Label htmlFor='desc'>Описание</Label>
        <p className={styles['error']}>
          {errors.desc?.message && errors.desc?.message}
        </p>
        <Textarea
          className={styles['task-desc']}
          id='desc'
          {...register('desc')}
        />
      </div>
    </form>
  );
}
