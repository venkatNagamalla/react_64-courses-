import {Link} from 'react-router-dom'
import './index.css'

const Course = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails
  return (
    <li className="course">
      <Link className="link" to={`/courses/${id}`}>
        <img className="course-logo" src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}

export default Course
