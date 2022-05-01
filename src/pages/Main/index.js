import styles from './style.less'
import BouncingBall from '@/component/BouncingBall'
const data = [
    { name: '河南省', id: 1, },
    { name: '后陈村', id: 2, route: 'login' },
    { name: '鹿邑县', id: 3, },
]
const index = ({ history }) =>
{
    const jumpBtn = (item) =>
    {
        switch (item.id)
        {
            case item.id:
                history.push('/' + item.route)
                break;
            default:
                break;
        }
    }
    return (
        <div className={styles.warp}>
            {data.map((item, index) => (
                // 单数向下 100px
                <div onClick={() => { jumpBtn(item) }} key={index} style={index % 2 === 0 ? { marginTop: '100px' } : null} className={styles.container}>
                    <BouncingBall data={item} />
                </div>
            ))
            }
        </div >
    );
};
export default index