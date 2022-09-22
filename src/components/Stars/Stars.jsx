import { FaStar, FaRegStar } from 'react-icons/fa'
import './Stars.css'

const Stars = ({ amount }) => {
    return (
    <div className="stars">
        { [1,2,3,4,5].map((_,i) => i < amount ? <FaStar key={i}/> : <FaRegStar key={i}/>) }
    </div>
  )
}

export default Stars