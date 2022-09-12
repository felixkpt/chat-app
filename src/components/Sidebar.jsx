import Chats from './Chats.jsx'
import Navbar from './Navbar.jsx'
import Search from './Search.jsx'
const Sidebar = ({ showMenu }) => {
    return (
        <div className='sidebar' style={showMenu ? { display: "block" } : {}}>
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}

export default Sidebar