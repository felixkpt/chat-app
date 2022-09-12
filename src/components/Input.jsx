import { uuidv4 } from '@firebase/util'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../firebase'
import Attach from '../img/attach.png'
import Img from '../img/img.png'
import { Error } from './notifications/Notifications'

const Input = () => {
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const [err, setErr] = useState(false)

    const handleSend = async () => {

        setErr(false)

        if (img) {
            try {
                const storageRef = ref(storage, uuidv4())
                const uploadTask = uploadBytesResumable(storageRef, img)
                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on(
                    (error) => {
                        // Handle unsuccessful uploads
                        setErr(true)
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            // console.log('File available at', downloadURL);
                            await updateDoc(doc(db, "chats", data.chatId), {
                                messages: arrayUnion({
                                    id: uuidv4(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL
                                })
                            })
                            // console.log(downloadURL)

                        });
                    }
                );
            } catch (e) {
                setErr(true)
            }
        } else {
            try {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuidv4(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now()
                    })
                })
            } catch (e) {
                setErr(true)
            }
        }
        // update lastMessage
        try {
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp()
            })
            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp()
            })
        } catch (e) {
            setErr(true)
        }

        if (!err) {
            setText('')
            setImg(null)
        }
    }
    return (
        <div className="input" style={err ? { borderColor: "red" } : { borderColor: "#999" }}>
            <input type="text" placeholder="Type something..." value={text} onChange={e => setText(e.target.value)} />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" id="file" style={{ display: 'none' }} onChange={e => setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input