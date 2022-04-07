// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, starring} = props
  const {id, title, date, isStared} = appointmentDetails

  const starred = () => {
    starring(id)
  }

  const starImage = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="item-container">
      <div>
        <p className="heading1">{title}</p>
        <p className="paragraph1">{date}</p>
      </div>
      <button type="button" testid="star" onClick={starred}>
        <img src={starImage} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
