import React from "react"
import { Link } from "gatsby"

const Pagination = ({ pageContext }) => {
  const { previousPagePath, nextPagePath } = pageContext

  return (
    <nav>
      <div>
        {previousPagePath && <Link to={previousPagePath}>Newer Posts</Link>}
      </div>

      <div>{nextPagePath && <Link to={nextPagePath}>Older Posts</Link>}</div>
    </nav>
  )
}

export default Pagination
