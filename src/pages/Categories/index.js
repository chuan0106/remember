import { useState, useRef, useEffect } from 'react';
import styles from './style.less'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { connect } from 'dva';
BScroll.use(Slide)

const index = ({ history, modelData }) =>
{
    const [bsContainer, setBsContainer] = useState(null),  // 保存 BS
        [currentPageIndex, setCurrentPageIndex] = useState(0),  // 右侧按钮高亮
        slideRef = useRef()
    useEffect(() =>
    {
        init()
    }, [])
    // 滚动初始化
    const init = () =>
    {
        let slide = new BScroll(slideRef.current, {
            scrollX: false,
            scrollY: true,
            slide: {
                threshold: 100,  // 临界点 下一页或上一页的阈值。
                autoplay: false,  // 是否自动播放
                interval: 10000,  // 间隔
                loop: true,  // 是否可以循环。但是当只有一个元素时，这个设置不生效。
                speed: 400,  // 页面动画的默认持续时间。
                // easing: ease.bounce,  // 缓和
                listenFlick: true,  // 当快速滑过滑动区域时，会触发上一页/下一页的切换。将 listenFlick 设置为 false 以关闭效果。
                autoplay: false,  // 是否开启自动播放。
                interval: 5000,  // 间隔
            },
            useTransition: true,  // 在某些 iPhone 系统上可能会出现闪烁
            momentum: false,  // 使用slide时，需要将此值设置为false，以避免惯性动画导致快速滚动时闪烁的问题，以及快速滑动时一次滚动多页的问题。
            bounce: false,  // 弹跳值需要设置为false，否则循环为true时会闪烁。
            stopPropagation: true,  // 是否停止事件传播。它通常用于嵌套滚动场景。
            probeType: 1  // 如果要注册slideWillChange事件，在用户拖动幻灯片时实时获取幻灯片PageIndex的变化，需要将probeType的值设置为2或3。

        })
        setBsContainer(slide)
        const _onScrollEnd = () =>
        {
            let pageIndex = slide.getCurrentPage().pageY
            setCurrentPageIndex(pageIndex)
        }
        const _onScrollChange = (page) =>
        {
            // console.log(page);
        }
        slide.on('scrollEnd', _onScrollEnd)
        // 当页面改变时
        slide.on('slidePageChanged', _onScrollChange)
        // 科幻片即将改变
        slide.on('slideWillChange', (page) =>
        {
            // console.log(page);
        })
        // 幻灯片已经改变
        slide.on('slidePageChanged', (page) =>
        {
            // console.log('CurrentPage changed to => ', page)
        })
    }
    // 跳转路由
    const typeClick = (item) =>
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
    // 鼠标进入暂停播放
    const handleMouse = (flag) =>
    {
        return () =>
        {
            flag ? bsContainer?.pausePlay() : bsContainer?.startPlay()
        }
    }
    // 右侧按钮跳转页数
    const goToPage = (index) =>
    {
        bsContainer?.goToPage(0, index)  // 没看到相关文档 应该是 x轴 y轴
    }
    return (
        <div onMouseEnter={handleMouse(true)} onMouseLeave={handleMouse(false)} className={styles.slide_vertical} >
            <div
                className={styles.vertical_wrapper} >
                <div className={styles.slide_vertical_wrapper} ref={slideRef} >
                    <div className={styles.slide_vertical_content} >
                        {modelData.map((item, index) => (

                            <div key={index} style={{ backgroundColor: item.color, backgroundImage: `url(${item.img})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }} className={styles.solid_page}>
                                <h1 className={styles.title}>{item.name}</h1>
                                <a onClick={() => { typeClick(item) }} type="primary">{item.type === 1 ? '点击进入' : '功能暂未开发'}</a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.dots_wrapper} >
                    {modelData.map((_, index) => (
                        <span onClick={() => { goToPage(index) }} key={index} className={currentPageIndex === index ? styles.active : styles.dot} ></span>
                    ))}
                </div>
            </div >
        </div >
    );
}

function mapStateToProps ({ Categories })
{
    return {
        modelData: Categories.data
    };
}
export default connect(mapStateToProps)(index);
