import React, { useState } from 'react';
import styles from './style.less';
const index = () =>
{
    const [preferential, setPreferential] = useState('一键查看所有折扣');
    const inquire = () =>
    {
        alert('我套你猴子')
    }
    return (
        <div className={styles.header}>
            <h1 className={styles.hidden}>你的商店</h1>
            <a
                className={styles.logo_lol}
                title="英雄联盟"
                href={'lol.qq.com'}
                target="_blank"
            ></a>
            <a
                className={`${styles.logo_djc} ${styles.logo_lol}`}
                href="www.baidu.com"
                target="_blank"
            ></a>
            <p className={styles.time}>2022年04月01日—04月31日</p>
            {/* 登陆前状态 开始 */}
            <div className={styles.login_info}>
                <div id="unLogin" className={styles.login} style={{ display: 'none' }}>
                    欢迎您, 请先
                    <a id="doLogin" href={''} title="QQ登陆">
                        【登陆】
                    </a>
                </div>
                {/* 登陆前状态 结束 */}
                {/* 登陆后状态 开始 */}
                <div id="loginEd" className={styles.login} style={{ display: 'block' }}>
                    欢迎您,
                    <span id="login_qq_span">190580343</span>
                    <span id="spanNotBind" style={{ display: 'none' }}>
                        <a href="">绑定大区</a>
                    </span>
                    <span id="spanBind">
                        <span id="area_info">黑色玫瑰 电信</span>
                        <span id="role_info">Heeeey丶丶</span>
                        <a href="">更改绑定</a>
                    </span>
                    <a href="//daoju.qq.com/mall/trade.shtml?flag=lol" target="_blank">
                        [查看订单]
                    </a>
                    <a id="dologout" title="注销" href="">
                        【注销】
                    </a>
                </div>
                {/* 登陆后状态 结束 */}
            </div>
            {/* 追加按钮灰色 */}
            <div id="btnBox" className={`${styles.btnBox} ${styles.btnBoxed}`}>
                {/* 这个背景图有两张图片 */}
                <a onClick={inquire} href="" title="一键查看所有折扣">
                    一键查看所有折扣
                </a>
            </div>
        </div>
    );
};
export default index;
