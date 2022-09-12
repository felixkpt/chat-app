import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import MenuHambugger from './MenuHambugger/MenuHambugger'

const Chat = ({ toggleMenu }) => {
    const { data } = useContext(ChatContext)

    return (
        <div className="chat">
            <div className="chatInfo">
                <div className='sidebar-toggler' onClick={toggleMenu}><MenuHambugger /></div>
                <span>{data?.user.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages toggleMenu={toggleMenu} />
            <Input />
        </div>
    )
}

export default Chat