import { Fragment } from 'react';
import styles from './style.less';
const data = [
  { name: '后陈互动娱乐', id: 1 },
  { name: '服务条款', id: 2 },
  { name: '隐私保护之音', id: 3 },
  { name: '儿童隐私指引', id: 4 },
  { name: '后陈游戏招聘', id: 5 },
  { name: '后陈游戏客服', id: 6 },
  { name: '游戏列表', id: 7 },
  { name: '成长守护平台', id: 8 },
  { name: '广告服务及商务合作', id: 9 },
];
const index = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_ieg}>
        <div className={styles.wrap_ieg}>
          <p>
            {data.map((data, index) => (
              <Fragment key={index}>
                <a href="" target="_blank" rel="noopener">
                  {data.name}
                </a>
                &nbsp;| &nbsp;
              </Fragment>
            ))}
          </p>
          <p>COPYRIGHT © 1998 – 2022 TENCENT. ALL RIGHTS RESERVED.</p>
          <p>
            <a href="" target="_blank">
              后陈公司 版权所有
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default index;
