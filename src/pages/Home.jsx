import { useState } from "react"
import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar"

const Home = () => {

    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = (action = null) => {
        if (action === 'close') return setShowMenu(false)
        setShowMenu(!showMenu)
    }

    return (
        <div className='home'>
            <div className="container">
                <Sidebar showMenu={showMenu} />
                <Chat toggleMenu={toggleMenu} />
            </div>
        </div>
    )
}

export default Home