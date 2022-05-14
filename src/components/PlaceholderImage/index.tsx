import { MdPhotoCamera } from 'react-icons/md'

import styles from './styles.module.scss'

export function PlaceholderImage() {
  return (
    <div className={styles.container}>
      <MdPhotoCamera size={150}/>
    </div>
  )
}