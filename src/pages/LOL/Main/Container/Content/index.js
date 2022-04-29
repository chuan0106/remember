import styles from './style.less';
const index = () =>
{
    const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
        <div className={styles.content}>
            {/* 无皮肤展示 */}
            <div className={styles.con3}>
                <div className={styles.con3_text}>
                    您在本大区拥有较多皮肤，
                    <i></i>
                    可能会出现推荐皮肤数较少或为零。
                    <br />
                    英雄联盟感谢您的支持，
                    <i></i>
                    期待在其他精彩活动中再次相遇。
                </div>
            </div>
            <div className={styles.con1}>
                <ul className={`${styles.skin1} ${styles.skin2}`}>
                    {arr.map((data, index) => (
                        <li key={index}>
                            <div className={styles.fold}>
                                <strong>
                                    <span>?</span>
                                    <i>折</i>
                                </strong>
                            </div>
                            <div className={styles.card}>
                                <div
                                    className={`${styles.card_side} ${styles.card_side_default}`}
                                ></div>
                            </div>
                            <a href="" className={styles.btnChk} title="点击查看"></a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.con2}>
                <h2 className={styles.rule_tit}>活动规则</h2>
                <p className={styles.rule_text}>
                    1、每位召唤师在每个大区有1次机会获取专属皮肤折扣优惠。
                    <br />
                    2、本活动将根据相关法律法规申请并保护召唤师个人信息，点击“获取优惠”按钮后将可查看详情并选择。
                    <br />
                    3、基于服务器背包，每个召唤师最多可以获得18个皮肤折扣推荐。如未拥有相关英雄，在下单时英雄会自动以相同折扣下单。
                </p>
                <p className={styles.rule_text}>
                    <span>Q：为什么我的皮肤数量和别人不一样？</span>
                    <br />
                    A：基于服务器背包和最近使用英雄（如已授权），每位召唤师可以获得0个-18个不等的皮肤推荐。如在本大区拥有较多皮肤，可能会出现推荐皮肤较少或为0的情况。英雄联盟感谢您的支持。
                </p>
                <p className={styles.rule_text}>
                    <span>
                        Q：为什么有时页面结算时的皮肤价格与该皮肤的在售价格不一致？
                    </span>
                    <br />
                    A：如果召唤师尚未解锁推荐皮肤的对应英雄，则本页面结算时的价格将包含该英雄的在同一折扣下价格。召唤师可以选择：
                </p>

                <p className={styles.rule_text}>
                    <span>● 以当前折扣同时解锁推荐皮肤与对应英雄</span>
                    <br />●
                    进入游戏商城后以蓝色精萃或点券解锁英雄（原价），再次回到活动页面后结算价格将实时变动为仅含推荐皮肤的价格。
                </p>

                <p className={`${styles.rule_text} ${styles.rule_text2}`}>
                    在此活动中Apple不是赞助者，也没有以任何形式参与活动。
                </p>
            </div>
        </div>
    );
};
export default index;
