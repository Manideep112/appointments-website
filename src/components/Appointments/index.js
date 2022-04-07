// Write your code here
import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', stared: false}

  onTitle = event => {
    const usertext = event.target.value
    this.setState({title: usertext})
  }

  onDate = event => {
    const date = event.target.value
    const dateSplit = date.split('-')

    const updatedDate = format(
      new Date(dateSplit[0], dateSplit[1], dateSplit[2]),
      'dd MMMM yyyy, EEEE',
    )
    this.setState({date: updatedDate})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date, appointmentsList} = this.state

    if (title !== '') {
      const appointment = {
        id: uuidv4(),
        title,
        date,
        isStared: false,
      }

      this.setState({
        appointmentsList: [...appointmentsList, appointment],
        title: '',
        date: '',
      })
    }
  }

  starMessage = id => {
    const {appointmentsList} = this.state

    const filteredList = appointmentsList.map(eachappointment =>
      eachappointment.id === id
        ? {...eachappointment, isStared: !eachappointment.isStared}
        : eachappointment,
    )

    this.setState({appointmentsList: filteredList})
  }

  starredLists = () => {
    const {stared} = this.state
    this.setState({stared: !stared})
  }

  render() {
    const {stared, title, date} = this.state
    let {appointmentsList} = this.state
    console.log(title)

    if (stared) {
      appointmentsList = appointmentsList.filter(
        eachappointment => eachappointment.isStared === true,
      )
    }

    const buttonStyle = stared ? 'button-stared' : 'stared-button'

    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="form-container">
            <form className="formOnly">
              <h1 className="heading">Add Appointment</h1>
              <label className="paragraph" htmlFor="title">
                Title
              </label>
              <input
                placeholder="Title"
                type="text"
                className="input-element"
                onChange={this.onTitle}
                id="title"
                value={title}
              />
              <label className="paragraph" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                className="input-element"
                onChange={this.onDate}
                value={date}
                id="date"
              />

              <button
                className="button"
                type="button"
                onClick={this.addAppointment}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="img-size"
            />
          </div>
          <hr />
          <div className="appointments-container">
            <h1 className="heading1">Appointments</h1>
            <button
              type="button"
              className={buttonStyle}
              onClick={this.starredLists}
            >
              Starred
            </button>
          </div>
          <ul className="unordered-list">
            {appointmentsList.map(eachappointment => (
              <AppointmentItem
                appointmentDetails={eachappointment}
                key={eachappointment.id}
                starring={this.starMessage}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
