import {FC} from "react";
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        404 Not Found
      </h1>
      <p className={styles.description}>Unfortunately, this page is not available in our online store</p>
    </div>
  )
}

export default NotFoundBlock;
