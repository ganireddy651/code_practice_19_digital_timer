// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
    timer: 25,
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds} = this.state
    if (timeElapsedInSeconds === 0) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
        timeElapsedInSeconds: 59,
      }))
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds - 1,
      }))
    }
  }

  resetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timerLimitInMinutes: 25,
    })
  }

  onMinusBtnClick = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning !== true) {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onPlusBtnClick = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning !== true) {
      this.setState(prevState => ({
        timer: prevState.timer + 1,
        timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
      }))
    }
  }

  render() {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
      timer,
    } = this.state

    // console.log(isTimerRunning)

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    const seconds =
      timeElapsedInSeconds > 9
        ? timeElapsedInSeconds
        : `0${timeElapsedInSeconds}`
    const minutes =
      timerLimitInMinutes > 9 ? timerLimitInMinutes : `0${timerLimitInMinutes}`

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-img-container">
            <h1 className="time-display">
              {minutes}:{seconds}
            </h1>
            <p>{isTimerRunning ? 'Running' : 'Paused'}</p>
          </div>
          <div className="activity-container">
            <div className="buttons-container">
              <button type="button" className="custom-button">
                <img
                  src={startOrPauseImageUrl}
                  alt={startOrPauseAltText}
                  className="icons"
                  onClick={this.onStartOrPauseTimer}
                />
                <p> {isTimerRunning ? 'Pause' : 'Start'}</p>
              </button>

              <button
                type="button"
                className="custom-button"
                onClick={this.resetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icons"
                />
                <p className="button-text">Reset</p>
              </button>
            </div>
            <div>
              <p>Set Timer limit</p>
              <div className="plus-minus-button-container">
                <button
                  className="minus-btn"
                  type="button"
                  onClick={this.onMinusBtnClick}
                >
                  -
                </button>
                <p className="num-container">{timer}</p>
                <button
                  className="plus-btn"
                  type="button"
                  onClick={this.onPlusBtnClick}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
