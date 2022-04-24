import styles from './styles.module.scss';
import commonStyles from '../../styles/commonStyles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import { BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={commonStyles.container}>
        <div className={styles.footerElements}>
          <Link href="/">
            <a>
              <span className={commonStyles.logo}>
                <Image src="/images/logo.svg" width={28} height={28} />
                <h1>the pragmatic</h1>
              </span>
            </a>
          </Link>

          <p>2022 the pragmatic</p>

          <div className={styles.socialMedias}>
            <Link href="/">
              <a>
                <BsInstagram size={20} />
              </a>
            </Link>

            <Link href="/">
              <a>
                <BsTwitter size={20} />
              </a>
            </Link>

            <Link href="/">
              <a>
                <BsLinkedin size={20} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
