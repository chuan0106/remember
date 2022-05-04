import styles from './style.less'
import Musical from '@/component/Musical'
const index = () =>
{
    return (
        <div className={styles.container}>
            <div className={styles.MusicalWarp}>
                <Musical />
            </div>
        </div>
    );
};
export default index