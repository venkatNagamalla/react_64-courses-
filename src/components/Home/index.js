import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import Course from '../Course'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [coursesData, setCoursesData] = useState({
    courses: [],
    apiStatus: apiStatusConstants.initial,
  })

  const modify = obj => ({
    name: obj.name,
    logoUrl: obj.logo_url,
    id: obj.id,
  })

  const getCourses = async () => {
    setCoursesData({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.courses.map(eachCourse => modify(eachCourse))
      setCoursesData({
        courses: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      setCoursesData({apiStatus: apiStatusConstants.failure})
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  const renderLoaderView = () => (
    <div className="container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={getCourses} className="failure-btn" type="button">
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => (
    <ul className="courses-container">
      {coursesData.courses.map(eachCourse => (
        <Course key={eachCourse.id} courseDetails={eachCourse} />
      ))}
    </ul>
  )

  const renderData = () => {
    switch (coursesData.apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }

  return (
    <div className="home-container">
      <h1 className="courses-heading">Courses</h1>
      {renderData()}
    </div>
  )
}

export default Home
