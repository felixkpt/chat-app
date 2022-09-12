import './menuhambugger.css'

const MenuHambugger = ({ close }) => {
    return (
        <div className={`menuhambugger ${close && 'close'}`} title={`${close ? 'Close menu' : 'Open menu'}`}>
            <span className='cross-bar'></span>
            <span className='cross-bar'></span>
            <span className='cross-bar'></span>
        </div>
    )
}

export default MenuHambugger