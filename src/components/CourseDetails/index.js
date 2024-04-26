import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const CourseDetails = props => {
  const [course, setCourse] = useState({
    apiStatus: apiStatusConstants.initial,
    details: {},
  })

  const modify = obj => ({
    id: obj.id,
    description: obj.description,
    imageUrl: obj.image_url,
    name: obj.name,
  })

  const getCourseDetails = async () => {
    setCourse({apiStatus: apiStatusConstants.inProgress})
    const {match} = props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = modify(data.course_details)
      setCourse({apiStatus: apiStatusConstants.success, details: updatedData})
    } else {
      setCourse({apiStatus: apiStatusConstants.failure})
    }
  }

  useEffect(() => {
    getCourseDetails()
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
      <button onClick={getCourseDetails} className="failure-btn" type="button">
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => {
    const {details} = course
    const {imageUrl, name, description} = details
    return (
      <div className="card-container">
        <div className="card">
          <img className="card-image" src={imageUrl} alt={name} />
          <div className="name-desc-container">
            <h1 className="card-name">{name}</h1>
            <p className="card-desc">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderData = () => {
    switch (course.apiStatus) {
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

  return renderData()
}

export default CourseDetails
