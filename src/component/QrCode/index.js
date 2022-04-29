import { useEffect, useRef, useState } from 'react'
import styles from './style.less'
import { BS } from '@/utils/BetterScroll'

import ewm from '@/assets/QrCode/ewm.jpg'
const index = () =>
{
    useEffect(() =>
    {
        BS(scrollRef.current)

    }, [])
    const [data, setData] = useState([
        '😀 😁 😂 🤣 😃',
        '😄 😅 😆 😉 😊',
        '😫 😴 😌 😛 😜',
        '👆🏻 😒 😓 😔 👇🏻'])
    const scrollRef = useRef()
    return (
        <div ref={scrollRef} className={styles.wrapper}>
            <div className={styles.content}>
                <img src={ewm} alt="" className={styles.ewmImg} />
                {/* {data.map((data, index) => (
                        <div key={index} className={styles.item} >{data}</div>
                    ))} */}
            </div>
        </div>
    )
}

export default index

