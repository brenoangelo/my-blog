import Image from 'next/image';
import styles from './styles.module.scss';
import commonStyles from '../../styles/commonStyles.module.scss';
import Link from 'next/link';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={commonStyles.container}>
        <Link href="/">
          <a>
            <span className={commonStyles.logo}>
              <Image src="/images/logo.svg" width={28} height={28} />
              <h1>the pragmatic</h1>
            </span>
          </a>
        </Link>
      </div>
    </header>
  );
}
