import styles from './style.less';
import Header from './Header';
import Content from './Content';
import Musical from '@/component/Musical'
const index = () =>
{
    return (
        <div className={styles.container}>
            {/* 音乐卡片 */}
            <div className={styles.MusicalWarp}>
                <Musical />
            </div>
            {/* 头部 */}
            <Header />
            {/* 皮肤盒子 */}
            <Content />
        </div>
    );
};
export default index;
