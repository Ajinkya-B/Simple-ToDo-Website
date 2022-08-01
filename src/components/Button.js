import PropTypes from 'prop-types';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

export const Button = ({ text, color, onClick, showAdd }) => {
  return (
    <div>
        <button onClick={onClick} style={{backgroundColor: color}} className="btn">
          <div style={{display: "flex", alignItems: "center"}}>
            {showAdd ? <AiFillMinusCircle style={{marginRight:'5px', padding:'0', fontSize: '16px'}}/> :
            <AiFillPlusCircle style={{marginRight:'5px', padding:'0', fontSize: '16px'}}/>}
            {text}
          </div>
        </button>
    </div>
  )
}


Button.defaultProps = {
    text: 'Undefined',
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}


export default Button