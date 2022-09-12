import './notifications.css'

export const Error = ({ message }) => {

    return (
        <div className='notification danger'>
            {message || 'Something went wrong'}
        </div>
    )
}
export const Success = ({ message }) => {

    return (
        <div className='notification success'>
            {message || 'Process was successful'}
        </div>
    )
}