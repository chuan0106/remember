import { useState, Fragment } from 'react'
import { message } from 'antd';
import styles from './style.less'
import QrCode from '@/component/QrCode'
const contentStyleShow = {
    transform: 'translateX(80%)'
}
const contentStyleHide = {
    transform: 'translateX(0%)'
}
const index = ({ history }) =>
{
    const [isShow, setIsShow] = useState(false)  // 控制登陆、注册
    const [showHide, SetShowHide] = useState(true)  // 控制登陆、注册显示隐藏
    const [isPassword, setIsPassword] = useState(false)  // 是否显示密码
    const [registerData, setRegisterData] = useState({  // 注册 state
        username: '',
        password: ''
    })
    const [landed, setLanded] = useState({  // 登陆 state
        username: '',
        password: ''
    })
    // 注册用户名正则 
    const registerNameReg = (name) =>
    {
        let reg = /^[a-zA-Z0-9_-u4e00-\u9fa5]{2,6}$/;
        return reg.test(name)
    }
    // 注册密码正则
    const registerPasswordsReg = (passwords) =>
    {
        let reg = /^[a-zA-Z0-9_-]{6,16}$/;
        return reg.test(passwords)
    }
    // 样式初始化
    const registerClick = () =>
    {
        setIsShow(false)
        SetShowHide(true)
        setRegisterData({
            username: '',
            password: ''
        })
    }

    const LoginClick = () =>
    {
        setIsShow(true)
        SetShowHide(false)
        setIsPassword(false)
    }
    // 注册
    const registerBtn = () =>
    {
        const { username, password } = registerData

        if (registerNameReg(username) && registerPasswordsReg(password))
        {
            localStorage.setItem('userName', username)
            localStorage.setItem('password', password)
            message.success('注册成功')
        }
    }
    // 登陆
    const Processing = (e) =>
    {
        // 阻止默认事件
        e.preventDefault();
        let name = localStorage.getItem('userName');
        let word = localStorage.getItem('password');
        const { username, password } = landed
        if (username === name && password === word)
        {
            message.success('登陆成功')
            setTimeout(() =>
            {
                history.push('/categories')
            }, 3000)
        } else
        {
            message.error('账号或密码错误')
        }
    }
    // 保存注册的数据
    const registerFormData = (dataType) =>
    {
        return (e) =>
        {
            try
            {
                const { value } = e.target
                setRegisterData({ ...registerData, [dataType]: value })
                // console.log(registerData);
            } catch (err)
            {
                console.log(err);
            }
        }
    }
    // 保存登陆的数据
    const landedFormData = (dataType) =>
    {
        return (e) =>
        {
            try
            {
                const { value } = e.target
                setLanded({ ...landed, [dataType]: value })
                // console.log(landed);
            } catch (err)
            {
                console.log(err);
            }
        }
    }
    // 是否显示密码
    const isPasswordBtn = () =>
    {
        setIsPassword(!isPassword)
    }

    return (
        <Fragment>
            <div className={styles.warp}>
                <QrCode />
                < div className={styles.container} >
                    <form onSubmit={Processing} style={isShow ? contentStyleShow : contentStyleHide} className={styles.form} >
                        {/* 注册 */}
                        {!showHide ? (
                            <div style={showHide ? { display: 'none' } : null} className={styles.register} >
                                <h1>注册</h1>
                                <div className={styles.input_wrap}> <input onChange={registerFormData('username')} type="text" placeholder='用户名' />
                                    <i className={registerNameReg(registerData.username) ? styles.success : styles.error}></i>
                                </div>
                                <div className={styles.input_wrap}> <input onChange={registerFormData('password')} type="text" autoComplete='true' placeholder='密码' />
                                    <i className={registerPasswordsReg(registerData.password) ? styles.success : styles.error}></i>
                                </div>
                                <button type='button' onClick={registerBtn} >注册</button>
                            </div>
                        ) : null}

                        {/* 登陆 */}
                        {showHide ? (
                            <div className={styles.login} >
                                <h1>登陆</h1>
                                <div className={styles.input_wrap}>
                                    <input onChange={landedFormData('username')} name='name' type="text" placeholder='用户名' />
                                </div>
                                <div className={styles.input_wrap}>
                                    <input onChange={landedFormData('password')} name='password' type={isPassword ? 'text' : 'password'} autoComplete='true' placeholder='密码' />
                                    <i onClick={isPasswordBtn} className={isPassword ? styles.isShow : styles.show}></i>
                                </div>
                                <button type='submit'>登陆</button>
                            </div>
                        ) : null}

                    </form>
                    <div className={`${styles.con} ${styles.left}`}>
                        <h2>欢迎来到<span>羽神小窝</span></h2>
                        <p>快来领取你的专属宠物</p>
                        <div className={styles.conImg}>
                            <img src="https://www.dataojocloud.com/dataeye/v1/data/image/get?imageid=617a5596fd73380b818dc300" alt="" />
                        </div>
                        <p>已有账号</p>
                        <button onClick={registerClick}>去登录</button>
                    </div>
                    <div className={`${styles.con} ${styles.right}`}>
                        <h2>欢迎来到<span>羽神小窝</span></h2>
                        <p>快来领取你的专属宠物</p>
                        <img src="https://www.dataojocloud.com/dataeye/v1/data/image/get?imageid=617a5596fd73380b818dc300" alt="" />
                        <p>没有账号?</p>
                        <button onClick={LoginClick}>去注册</button>
                    </div>
                </div>
            </div >
        </Fragment>

    )
}

export default index

