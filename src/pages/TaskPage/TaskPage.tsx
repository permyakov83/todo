import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

import styles from './TaskPage.module.scss';

const props = {
  id: 1,
  title: 'Первая задача',
  desc: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. На берегу встретил, деревни текстов продолжил имеет за это вопрос грустный!'
};

export function TaskPage() {
  const { id, title, desc } = props;

  return (
    <div className={styles['task-page']}>
      <div>
        <Button variant='outline' size='icon'>
          <ChevronRight />
        </Button>
        <Button variant='outline'>Сохранить</Button>
        <Button variant='destructive'>Удалить</Button>
      </div>
      <span>{id}</span>
      <Input />
      <Textarea />
    </div>
  );
}
