import { Undo2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ITask } from '../../app/interfaces/ITask';
import {
  getDataLS,
  addDataLS,
  editDataLS,
  delDataLS
} from '../../app/api/LocalStorage';
import { Button } from '../../shared/Button/Button';
import { z } from 'zod';
import cn from 'classnames';

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
  const tasks: ITask[] = getDataLS();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(CreateTaskShema)
  });

  const isId = (element: ITask) => {
    return element.id === id;
  };
  const currentTask = tasks.find(isId);
  if (currentTask && currentTask.title && currentTask.desc) {
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
          onClick={() => {
            navigate('/');
          }}
        >
          <Undo2 />
          Назад к списку задач
        </Button>
        <Button variant='delete' type='button' onClick={onDelete}>
          Удалить
        </Button>
      </div>
      <div className={styles['wrapper']}>
        <label htmlFor='title'>Номер задачи</label>
        <input
          className={cn(styles['input'], styles['task-id'])}
          id='id'
          value={id}
          disabled
          {...register('id')}
        />
      </div>
      <div className={styles['wrapper']}>
        <label htmlFor='title'>Тема</label>
        <p className={styles['error']}>
          {errors.title?.message && errors.title?.message}
        </p>
        <input
          className={cn(styles['input'], styles['task-title'])}
          id='title'
          {...register('title')}
        />
      </div>
      <div className={styles['wrapper']}>
        <label htmlFor='desc'>Описание</label>
        <p className={styles['error']}>
          {errors.desc?.message && errors.desc?.message}
        </p>
        <textarea
          className={cn(styles['input'], styles['task-desc'])}
          id='desc'
          {...register('desc')}
        />
      </div>
      <Button type='submit'>Сохранить</Button>
    </form>
  );
}
