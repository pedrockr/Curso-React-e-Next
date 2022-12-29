import './styles.css'
export const ButtonNextPage = ({text, onClick, disabled}) => (
    <button className='button' disabled={disabled} onClick={onClick}>{text}</button>
)