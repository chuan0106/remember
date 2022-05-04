import { useState, useEffect, useRef } from 'react';
import styles from './style.less'
import
{
    RetweetOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    MenuFoldOutlined,
    MinusOutlined,
    SwapOutlined,
    CloseOutlined,
    PauseOutlined,
    PlayCircleOutlined,
    ZoomOutOutlined
} from '@ant-design/icons'

let allMusic = [
    {
        name: "羽神",
        id: 1,
        artist: '俗称一代歌神',
        img: "https://www.dataojocloud.com/dataeye/v1/data/image/get?imageid=617a5596fd73380b818dc300",
        src: "团团",
    },
    {
        name: "二弟",
        id: 2,
        artist: "二帝天下无敌",
        img: 'https://www.dataojocloud.com/dataeye/v1/data/image/get?imageid=617a559d2ee1bd5a04779569',
        src: "我TM不愿意",
    },
    {
        name: '汗青',
        id: 3,
        artist: '经常流汗 且没有情',
        img: "https://www.dataojocloud.com/dataeye/v1/data/image/get?imageid=617a55a011001e6b8ea0cce3",
        src: "music-3",
    },
    {
        name: '团团',
        id: 4,
        artist: '嘟嘟嘟嘟',
        img: "https://www.dataojocloud.com/dataeye/v1/data/image/get?imageid=617a55a422a0c62f56684521",
        src: "music-4",
    },
];

const index = () =>
{
    // 随机数
    function getRandomIntInclusive (min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const
        mainAudio = useRef(),  // 控制音乐播放
        progressBar = useRef(),  // 进度条总长度
        musicCurrentTime = useRef(),  // 音乐当前时间
        totalMusicTime = useRef(),  // 音乐总时间
        progressAreaRef = useRef(),  // 获取进度条内容
        cutOverRef = useRef(),  // 切换按钮
        ulTagRef = useRef(),  // 暂时没用到 ~
        liAudioRef = useRef(),  // 获取列表每一首歌的时间
        listTotalMusicTime = useRef()  // 列表总时间

    const [toggle, setToggle] = useState(1),  // 展示哪个切换按钮
        [randomIndex, setRandomIndex] = useState(getRandomIntInclusive(0, allMusic.length - 1)),
        [musicData, setMusicData] = useState(allMusic[0]),  // 首次进入是第一个播放
        [moreMusicIsShow, setMoreMusicIsShow] = useState(false),  // 判断 list 是否显示
        [playback, setPlayback] = useState(false)  // 是否播放

    useEffect(() =>
    {

        if (playback)  // 此 IF 是防止第一次直接进行播放 这也正是不被推荐的 不然会有一个小小的错误
        {
            playMusic()
        }
        initMusic(randomIndex);
    }, [randomIndex, musicData])



    //函数，用于加载音乐，参数为对应音乐的序号
    const initMusic = (index) =>
    {
        setMusicData(allMusic[index])
    }
    //  音乐开始
    const playMusic = () =>
    {
        mainAudio.current.play();
    }

    //  音乐暂停
    function pauseMusic ()
    {
        mainAudio.current.pause();
    }

    //函数，用于播放上一首
    function prevMusic ()
    {
        randomIndex <= allMusic.length - 1 && randomIndex > 0 ? setRandomIndex(randomIndex - 1) : setRandomIndex(allMusic.length - 1);
        initMusic(randomIndex);
        // playMusic();
    }

    //函数，用于播放下一首
    const nextMusic = () =>
    {
        randomIndex >= allMusic.length - 1 ? setRandomIndex(0) : setRandomIndex(randomIndex + 1);
        initMusic(randomIndex)
        // playMusic();
    }

    //切换更改播放方式的按钮
    const repeatBtn = () =>
    {
        // 给切换按钮添加点击事件
        // 获取当前的播放方式（单曲循环，列表循环，随机）
        const { current } = cutOverRef

        // 根据 DOM title 做判断
        switch (current.title)
        {
            //当前为列表循环时，点击修改为单曲循环
            case "normal":
                setToggle(2)
                current.setAttribute("title", "cycle");
                break;
            //当前为单曲循环时，点击修改为随机播放
            case "cycle":
                setToggle(3)
                current.setAttribute("title", "random");
                break;
            //当前为随机播放时，点击修改为列表循环
            case "random":
                setToggle(1)
                current.setAttribute("title", "normal");
                break;
        }
    }


    //所有音乐界面每个条目的点击事件
    const clicked = (index) =>
    {
        setRandomIndex(index)
        initMusic(index)
        // playMusic();
    }

    //给播放按钮添加点击事件
    const playPauseBtn = () =>
    {
        playback ? pauseMusic() : playMusic();
        setPlayback(!playback)
    }
    //给上一首按钮增加点击事件
    const prevBtn = () =>
    {
        //调用函数，切换至上一首
        setPlayback(true)
        prevMusic();
    }
    //给下一首按钮增加点击事件
    const nextBtn = () =>
    {
        //调用函数，切换至下一首
        setPlayback(true)
        nextMusic();
    }
    //更新音乐的进度条
    const mainAudioUpDate = (e) =>
    {
        //获取当前播放的时间
        const currentTime = e.target.currentTime;
        //获取音乐总时间
        const duration = e.target.duration;
        //计算当前播放的百分比
        let progressWidth = (currentTime / duration) * 100;
        //给css赋值
        progressBar.current.style.width = `${progressWidth}%`;

        //更新当前播放的时刻
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10)
        {
            //不够十秒补零
            currentSec = `0${currentSec}`;
        }
        //显示获取到的当前播放时刻
        musicCurrentTime.current.innerText = `${currentMin}:${currentSec}`;
    }
    // 音乐加载的时候
    const mainAudioLoad = () =>
    {
        const { current } = mainAudio
        //获取播放时间并转化成分和秒
        let mainAdDuration = current.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10)
        {
            //不够十秒补零
            totalSec = `0${totalSec}`;
        }
        //显示获取到的音乐总时间
        totalMusicTime.current.innerText = `${totalMin}:${totalSec}`;
    }

    //给进度条添加点击事件，用于跳转播放
    const progressArea = (e) =>
    {
        const { current } = progressAreaRef
        //获取进度条的宽度
        let progressWidth = current.clientWidth;
        //获取点击进度条时的x坐标
        // react 虚拟 DOM 不能直接获取 offsetX 要从 e.nativeEvent.offsetX得到它！ 由react返回的事件对象是一个反应SyntheticEvent，它封装了普通的JavaScript事件对象并包含一些跨浏览器的便利。
        let clickedOffsetX = e.nativeEvent.offsetX;
        //获取音乐总长度
        let songDuration = mainAudio.current.duration;
        //修改音乐播放的当前时刻，及跳转播放
        mainAudio.current.currentTime = (clickedOffsetX / progressWidth) * songDuration;
        //调用播放音乐的函数
        playMusic();
    }
    //给音乐结束添加事件
    const mainAudioEnd = () =>
    {
        //获取当前播放方式
        const { current } = cutOverRef
        let getText = current.title;
        //根据当前不同的播放方式，确定下一首播放哪个音乐
        switch (getText)
        {
            // 当前为列表循环时，调用播放下一首
            case "normal":
                nextMusic();
                break;
            // 当前为单曲循环时，重新加载当前音乐
            case "cycle":
                initMusic(randomIndex)
                break;
            //当前为随机播放时，随机获取下一首的序号，并播放
            case "random":
                setRandomIndex(getRandomIntInclusive(0, allMusic.length - 1))
                initMusic(randomIndex)
                break;
        }
    }
    //给所有音乐按钮添加点击事件
    const moreMusicBtn = () =>
    {
        setPlayback(true)  // 为 true 播放
        setMoreMusicIsShow(!moreMusicIsShow)
    }
    const closeBtn = () =>
    {
        moreMusicBtn()
    }

    const liAudioTag = () =>
    {
        const { current } = liAudioRef
        //获取播放时间并转化成分和秒

        for (const key in allMusic)
        {

            let mainAdDuration = current.duration;
            let totalMin = Math.floor(mainAdDuration / 60);
            let totalSec = Math.floor(mainAdDuration % 60);
            if (totalSec < 10)
            {
                //不够十秒补零
                totalSec = `0${totalSec}`;
            }
            // allMusic[key].totalTime = `${totalMin}:${totalSec}`;  // 这个是显示时间 奈何本人实力如此差劲
            allMusic[key].totalTime = `播放`;
        }

        // listTotalMusicTime.current.innerText = `${totalMin}:${totalSec}`;

    }

    const listDom = () =>
    {
        const { current } = ulTagRef
        if (current)
        {
            // console.log(allMusic.length, 'allMusic.length');
            for (let i = 0; i < allMusic.length; i++)
            {
                //利用循环，给每一首歌生成HTML代码
                let liTag = `<li li-index="${i + 1}">
                        <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                        </div>
                        <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="./${allMusic[i].src
                    }.mp3"></audio>
                      </li>`;
                //将生成的代码插入到ul中
                current.insertAdjacentHTML("beforeend", liTag);
                let liAudioDuartionTag = current.querySelector(`#${allMusic[i].src}`);
                let liAudioTag = current.querySelector(`.${allMusic[i].src}`);
                if (liAudioTag)
                {
                    // 获取每一首音乐的时长，用于在所有音乐界面显示
                    liAudioTag.addEventListener("loadeddata", () =>
                    {
                        let duration = liAudioTag.duration;
                        let totalMin = Math.floor(duration / 60);
                        let totalSec = Math.floor(duration % 60);
                        if (totalSec < 10)
                        {
                            //不够十秒则补零
                            totalSec = `0${totalSec}`;
                        }
                        liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`;
                        liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
                    });
                }

            }
        }
    }
    const cutOverDom = () =>
    {
        let repeat = <RetweetOutlined onClick={repeatBtn} ref={cutOverRef} id="repeat-plist" className={`${styles.iconfont} ${styles.icon_liebiaoxunhuan}`} title="normal"></RetweetOutlined>
        let singleCycle = <MinusOutlined onClick={repeatBtn} ref={cutOverRef} id="repeat-plist" className={`${styles.iconfont} ${styles.icon_liebiaoxunhuan}`} title="cycle"></MinusOutlined>
        let shufflePlayback = <SwapOutlined onClick={repeatBtn} ref={cutOverRef} id="repeat-plist" className={`${styles.iconfont} ${styles.icon_liebiaoxunhuan}`} title="random"></SwapOutlined>
        // const dom = (
        let cutOver = toggle === 1 ? repeat : toggle === 2 ? singleCycle : toggle === 3 ? shufflePlayback : null
        return cutOver
        // )
        // return dom
    }
    const PausePlaybackDom = () =>
    {
        let pause = <PlayCircleOutlined id="start" className={`${styles.iconfont} ${styles.playback} ${styles.play} `}
        ></PlayCircleOutlined>
        let playBack = <PauseOutlined id="start" className={`${styles.iconfont} ${styles.playback} ${styles.play} `}
        ></PauseOutlined>
        return playback ? playBack : pause
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.img_area}>
                <img src={musicData?.img} alt="" />
            </div>
            <div className={styles.song_details}>
                <p className={styles.name}>{musicData?.name}</p>
                <p className={styles.artist}>{musicData?.artist}</p>
            </div>
            <div onMouseDown={progressArea} onClick={progressArea} ref={progressAreaRef} className={styles.progress_area}>
                <div ref={progressBar} className={styles.progress_bar}>
                    <audio src={`./audio/${musicData?.src}.mp3`} ref={mainAudio} onLoadedData={mainAudioLoad} onEnded={mainAudioEnd} onTimeUpdate={mainAudioUpDate} id="main-audio" ></audio>
                </div>
                <div className={styles.song_timer}>
                    <span ref={musicCurrentTime} className={styles.current_time}>0:00</span>
                    <span ref={totalMusicTime} className={styles.max_duration}>0:00</span>
                </div>
            </div>
            <div className={styles.controls}>
                {cutOverDom()}
                <CaretLeftOutlined id="prev" onClick={prevBtn} className={`${styles.iconfont} ${styles.icon_shangyishou}`}
                ></CaretLeftOutlined>
                <div onClick={playPauseBtn} className={styles.play_pause} >
                    {PausePlaybackDom()}
                </div>
                <CaretRightOutlined id="next" onClick={nextBtn} className={`${styles.iconfont} ${styles.icon_xiayishou}`} ></CaretRightOutlined>
                <MenuFoldOutlined id="more-music" onClick={moreMusicBtn} className={` ${styles.iconfont} ${styles.icon_yinleliebiao}  `} ></MenuFoldOutlined>
            </div>
            <div className={` ${styles.music_list} ${moreMusicIsShow ? styles.show : null}  `}  >
                <div className={styles.header} >
                    <div className={styles.row} >
                        <ZoomOutOutlined className={`${styles.iconfont} ${styles.list} ${styles.icon_yinleliebiao}`} ></ZoomOutOutlined>
                        <span className={styles.rowTitle}>音乐列表</span>
                    </div>
                    <CloseOutlined id="close" style={{ width: '22px' }} onClick={closeBtn} className={`${styles.iconfont} ${styles.icon_guanbi}`} ></CloseOutlined>
                </div>
                <ul ref={ulTagRef}>
                    {/* {listDom()} */}
                    {allMusic.map((data, index) =>
                    {
                        return (
                            <li className={randomIndex === index ? styles.playing : null} key={index}>
                                <div className={styles.row}>
                                    <span>{data.name}</span>
                                    <p>{data.artist}</p>
                                </div>
                                <span style={randomIndex === index ? { color: '#ff74a4' } : null} onClick={() => { clicked(index) }} ref={listTotalMusicTime} className={styles.audio_duration}  >{randomIndex === index ? '正在播放...' : '播放'}</span>
                                <audio id='listAudio' onLoadedData={liAudioTag} ref={liAudioRef} className={`${data.src}`} src={`./${data?.src}.mp3`}></audio>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div >
    );
};
export default index



