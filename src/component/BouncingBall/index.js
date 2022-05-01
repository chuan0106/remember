import React from 'react';
import styles from './style.less'
const index = ({ data }) =>
{
    const { name } = data
    return (
        // 背景颜色 抽到 Main里面了
        <div className={styles.container}>
            <div className={styles.bubble}>
                <span>{name}</span>
            </div>
            <div className={styles.shadow}></div>
        </div>
    );
};
export default index