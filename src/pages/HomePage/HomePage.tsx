import { Button } from '@/components/ui/button';
import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <section className={styles.home}>
      <Button className={styles['home__btn']} variant='destructive'>
        Поехали!
      </Button>
    </section>
  );
}
