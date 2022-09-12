import { doc, onSnapshot } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/ChatContext"
import { db } from "../firebase"
import Message from "./Message"

const Messages = ({ toggleMenu }) => {
    const { data } = useContext(ChatContext)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            // console.log(doc.data().messages)
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub()
        }

    }, [data.chatId])
    return (
        <div className="messages" onClick={() => toggleMenu('close')}>
            {messages ? messages.map(message => (
                <Message message={message} key={message.id} />
            )) : 'No messages here!'}
        </div>
    )
}

export default Messages