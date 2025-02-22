import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Undo2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ITaskProps } from '@/entities/Task/Task';
import {
  getDataLS,
  addDataLS,
  editDataLS,
  delDataLS
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
  const tasks: ITaskProps[] = getDataLS();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(CreateTaskShema)
  });

  const isId = (element: ITaskProps) => {
    return element.id === id;
  };
  const currentTask = tasks.find(isId);
  if (currentTask) {
    setValue('title', currentTask.title);
    setValue('desc', currentTask.desc);
  }

  const onSubmit: SubmitHandler<CreateTask> = (data) => {
    if (currentTask === undefined) {
      addDataLS(data);
      navigate('/');
    } else {
      editDataLS(data);
      navigate('/');
    }
  };

  const onDelete = () => {
    if (window.confirm('Вы уверены что хотите удалить эту задачу?')) {
      if (id != undefined) delDataLS(id);
      navigate('/');
    }
  };

  return (
    <form className={styles['task-page']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['task-page__title']}>Задача номер {id}</h2>
      <div className={styles['task-page__btn-panel']}>
        <Button
          variant='outline'
          onClick={() => {
            navigate('/');
          }}
        >
          <Undo2 />
          Назад к списку задач
        </Button>
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
      <Button variant='outline' type='submit'>
        Сохранить
      </Button>
    </form>
  );
}
