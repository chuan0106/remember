import { useState, useEffect } from 'react'
import styles from './style.less'
import csdn from '@/assets/common/csdn.png'
import zxc from '@/assets/common/zxc.jpg'
import gift from '@/assets/common/gift.gif'

// transform 可以不加~
const contentStyleShow = {
    display: 'block',
    // transform: 'translateX(0%)',
    // opacity: 1

}
// 因为把这个东西隐藏掉了 所以显示的时候不会有动画 或者 opacity 用 state 定义
const contentStyleHide = {
    display: 'none',
    // transform: 'translateX(80%)',
    // opacity: 0
}
const data = [
    { name: '羽神', id: 1 },
    { name: '后陈臧汗青', id: 2 },
    { name: '少主', id: 3 },
    { name: '大鼎', id: 4 },
    { name: '关羽', id: 5 },
    { name: '刘备', id: 6 },
    { name: '张飞', id: 7 },
    { name: '郭帅', id: 8 },
]
const data1 = [
    { name: '头像', id: 1 },
    { name: '会员中心', id: 2 },
    { name: '足迹', id: 3 },
    { name: '动态', id: 4 },
    { name: '消息', id: 5 },
    { name: '创作', id: 6 }
]
// input 显示内容
const inputName = [
    { name: '羽神天下第一', id: 1, type: true },
    { name: '后陈村', id: 2, type: true },
    { name: '金刚葫芦娃', id: 3, type: true },
    { name: '数码宝贝', id: 4 },
    { name: '鲤鱼跃龙门', id: 5 },
    { name: '陈笑豪', id: 6 },
    { name: '铜锣湾扛把子', id: 7 },
]
const listData = [
    { name: '奔波儿灞', id: 1 },
    { name: '霸波尔奔', id: 2 },
    { name: '羽神天下第一', id: 3 },
    { name: '铜锣湾扛把子', id: 4 },
    { name: '陈笑楠', id: 5 },
    { name: '嗨嗨嗨', id: 6 },
]
const index = () =>
{

    const [active, setActive] = useState(data[0].id)
    const [vipName, setVipName] = useState('会员中心 '), // 后面有加了个空格的
        [placeholder, setPlaceholder] = useState(inputName[0]),  // 首次从1开始
        [randomIndex, setRandomIndex] = useState(1),  // 3秒后从1开始依次播放
        [mouseUser, setMouseUser] = useState(false),  // 用户鼠标移入移出
        [opacity, setOpacity] = useState(0)

    useEffect(() =>
    {
        let timer = setTimeout(() =>
        {
            initPlaceholder(randomIndex)
        }, 3000);
        return () =>
        {
            clearTimeout(timer)
        }
    }, [placeholder, randomIndex])

    const initPlaceholder = (subscript) =>
    {
        subscript >= inputName.length - 1 ? setRandomIndex(0) : setRandomIndex(randomIndex + 1);
        setPlaceholder(inputName[randomIndex])
    }
    // 接收传递过来的id做判断给指定的样式

    const btnStyle = (id) =>
    {
        let style = null
        style = id === 1 ? styles.toolbar_btn_user : id === 2 ? styles.toolbar_btn_vip : id === 3 ? styles.toolbar_btn_collect : id === 4 ? styles.toolbar_btn_dynamic : id === 5 ? styles.toolbar_btn_message : id === 6 ? styles.toolbar_btn_write : null
        return style
    }
    // 修改 left 选中线
    const activeFun = (id) =>
    {
        setActive(id)
    }
    // 鼠标移入移出
    const handleMouse = (flag) =>
    {
        return () =>
        {
            // flag ? setOpacity(opacity => opacity += .1) : setOpacity(opacity => opacity += .1)
            setMouseUser(flag)
        }
    }
    return (
        <div className={styles.toolbar}>
            <div className={styles.toolbar_inside}>
                <div className={styles.toolbar_container}>
                    <div className={styles.toolbar_container_left}>
                        <div className={`${styles.toolbar_logo} ${styles.toolbar_subMenu_box} ${styles.toolbar_fl}`} >
                            <a title='首页' href=""><img src={csdn} alt="" /></a>
                        </div>
                        <ul className={`${styles.toolbar_menus} ${styles.toolbar_fl}`}>
                            {data.map((data, index) => (
                                <li onClick={() => { activeFun(data.id) }} className={active === data.id ? styles.active : null} key={index}>
                                    <a href="/lol">{data.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.toolbar_container_middle}>
                        <div className={`${styles.toolbar_search} ${styles.onlySearch}`}>
                            <div className={styles.toolbar_search_container}>
                                <span style={!placeholder.type ? { display: 'none' } : null} className={styles.icon_fire}></span>
                                <input autoComplete='off' readOnly placeholder={placeholder.name} type="text" />
                                <button><i></i> <span>搜索</span></button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.toolbar_container_right}>
                        <div className={`${styles.toolbar_btnS} ${styles.onlyUser}`}>

                            <div onMouseEnter={handleMouse(true)}
                                onMouseLeave={handleMouse(false)} className={`${styles.toolbar_btn} ${styles.toolbar_btn_user} ${styles.toolbar_fl} ${styles.toolbar_subMenu_box}  ${mouseUser ? styles.toolbar_btn_user_action : null} `}>
                                <a className={styles.hasAvatar} href="">
                                    <img src={zxc} alt="" />
                                </a>
                                {/* 用户触碰显示 */}
                                <div className={styles.toolbar_plugin} style={mouseUser ? contentStyleShow : contentStyleHide}>
                                    <div className={styles.profile_top}>
                                        <a className={styles.profile_avatar} href="">
                                            <img src={zxc} alt="" />
                                        </a>
                                        <p className={styles.profile_nickName}>臧小川</p>
                                        <a className={styles.profile_no_vip} href=""></a>
                                    </div>
                                    <div className={styles.profile_middle}>
                                        <a href="">
                                            <i>185</i>
                                            粉丝
                                        </a>
                                        <a href="">
                                            <i>185</i>
                                            关注
                                        </a>
                                        <a href="">
                                            <i>185</i>
                                            获赞
                                        </a>
                                    </div>
                                    <div className={styles.profile_bottom}>
                                        <ul className={styles.border_bottom}>
                                            {listData.map((data, index) => (
                                                <li key={index}>
                                                    <a key={index} href="">
                                                        <i></i>
                                                        {data.name}
                                                    </a>
                                                </li>
                                            ))}
                                            <li className={`${styles.pb_8}  ${styles.border_bottom}`}>
                                                <a href="">
                                                    <i></i>
                                                    哈哈哈
                                                </a>
                                            </li>
                                            <li className={`${styles.pb_8} ${styles.pt_8}  ${styles.border_bottom}`}>
                                                <a href="">
                                                    <i></i>
                                                    哈哈哈
                                                </a>
                                            </li>
                                            <li className={`${styles.pt_8}  ${styles.profile_logout}`}>
                                                <a href="">
                                                    <i></i>
                                                    哈哈哈
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.toolbar_btn} ${styles.toolbar_btn_vip} ${styles.toolbar_fl} `}>
                                <a href="">
                                    {vipName}
                                    <img src={gift} alt="" />
                                </a>
                            </div>
                            <div className={`${styles.toolbar_btn} ${styles.toolbar_btn_collect} ${styles.toolbar_fl} `}>
                                <a href="">
                                    足迹
                                </a>
                            </div>
                            <div className={`${styles.toolbar_btn} ${styles.toolbar_btn_dynamic} ${styles.toolbar_fl} `}>
                                <a href="">
                                    动态
                                </a>
                            </div>
                            <div className={`${styles.toolbar_btn} ${styles.toolbar_btn_msg} ${styles.toolbar_fl} `}>
                                <div className={styles.toolbar_subMenu_box}>
                                    <a href="">
                                        <span className={styles.pos_rel}>消息</span>
                                    </a>
                                </div>
                            </div>
                            <div className={`${styles.toolbar_btn} ${styles.toolbar_btn_write} ${styles.toolbar_fl} `}>
                                <a href="">
                                    <i></i>创作<i></i>
                                </a>
                            </div>
                            {/* {data1.map((data, index) => (
                                <div className={`${styles.toolbar_btn} ${btnStyle(data.id)} ${styles.toolbar_fl}`} key={index}>
                                    {data.id === 1 ? (
                                        <a className={styles.hasAvatar} href="">
                                            <img src="https://www.dataojocloud.com/dataeye/v1/data/image/get?imageid=617a5596fd73380b818dc300" alt="" />
                                        </a>
                                    ) : null}
                                    {data.id === 2 ? (
                                        <a href="">
                                            {data.name}
                                            <img src="https://www.dataojocloud.com/dataeye/v1/data/image/get?imageid=617a5596fd73380b818dc300" alt="" />
                                        </a>
                                    ) : null}
                                    {data.id === 3 ? (
                                        <a href="">
                                            {data.name}
                                        </a>
                                    ) : null}
                                    {data.id === 4 ? (
                                        <a href="">
                                            {data.name}
                                        </a>
                                    ) : null}
                                    {data.id === 5 ? (
                                        <a href="">
                                            {data.name}
                                        </a>
                                    ) : null}
                                    {data.id === 6 ? (
                                        <a href="">
                                            {data.name}
                                        </a>
                                    ) : null}
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default index