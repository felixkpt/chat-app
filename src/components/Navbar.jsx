import { signOut } from "firebase/auth"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { auth } from "../firebase"

const Navbar = () => {
    const { currentUser: user } = useContext(AuthContext)
    return (
        <div className="navbar">
            <span className="logo">Married Chat</span>
            <div className="user">
                <img src={user.photoURL} alt="" />
                <span>{user.displayName}</span>
                <button onClick={() => signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar