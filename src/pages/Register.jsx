import PlaceholderAvatar from '../img/default-user.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../firebase';
import { useState } from 'react';
import slugify from '../helpers/Slugify'
import { Error, Success } from '../components/notifications/Notifications';
// Database
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const loc = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            setSuccess(false)
            setErr(false)
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, slugify(displayName + '-' + (new Date().toISOString())) + '-' + file.name.split('.').pop())
            // Upload the file and metadata
            const uploadTask = uploadBytesResumable(storageRef, file);

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
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        })


                        // Add a new document in collection "users"
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        });

                        // init this user chats
                        await setDoc(doc(db, 'userChats', res.user.uid), {})
                        setSuccess(true)
                        loc('/')
                    });
                }
            );

        } catch (e) {
            setErr(true)
        }

    }
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>Married Chat</span>
                <span className='title'>Register</span>
                {success && <Success message="You are now registered!" />}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Display name' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <input type="file" id='file' style={{ display: 'none' }} />
                    <label htmlFor="file" className='avatarLabel'><img className='avatar' src={PlaceholderAvatar} alt="" />Add avatar</label>
                    <button>Sign up</button>
                    {err && <Error />}
                </form>
                <p>You have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    )
}

export default Register