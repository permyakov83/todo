import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

export function Layout() {
  return (
    <div className={styles['layout']}>
      <div className={styles['header']}>
        <h1 className={styles['header__title']}>Добро пожаловать!</h1>
        <p className={styles['header__sub-title']}>Это ваш список задач!</p>
      </div>
      <div className={styles['container']}>
        <Outlet />
      </div>
    </div>
  );
}
