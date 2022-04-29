import { Fragment } from 'react';
import styles from './style.less';
import Container from './Container';
import Footer from './Footer';
const index = () =>
{
    return (
        //   内容文件
        <Fragment>
            {/* React Helmet是一个HTML文档head管理工具，管理对文档头的所有更改。React Helmet采用纯HTML标记并输出纯HTML标记，非常简单，对React初学者十分友好。 */}
            <div className={styles.wrap}>
                {/* 主要内容 */}
                <Container />
                {/* 公共底部 */}
                <Footer />
            </div>
        </Fragment>
    );
};
export default index;
