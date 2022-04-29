import styles from './style.less'
import { useEffect, useState } from 'react';
import { Result, Button } from 'antd';

const index = ({ history }) =>
{

    const [count, setCount] = useState(5)
    useEffect(() =>
    {
        count === 0 ? history.replace('/') : document.title = `您还有${count}秒返回首页`
        let timer = setTimeout(() =>
        {
            setCount(count - 1)
        }, 1000);
        return () =>
        {
            clearTimeout(timer)
        }
    }, [count])
    const backHome = () =>
    {
        history.push('/')
    }
    const generateRandomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

    return (
        <div className={styles.container}>
            <span style={{ color: generateRandomHexColor() }} className={styles.prompt}>您将在{count}秒后跳转到首页</span>
            <Result
                status="404"
                title="404"
                subTitle="抱歉，您访问的页面不存在"
                extra={<Button onClick={backHome} type="primary">返回首页</Button>}
            />
        </div >
    );
};
export default index