import React from "react"
import { graphql } from "gatsby"

const Events = ({ data }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Events</h1>
      <hr />
      <h2 className="text-2xl">Future Events</h2>
      <ul>
        {data.myFutureEvents.nodes.map(event => (
          <div
            className="m-2 p-2 rounded border-2 border-red-500"
            key={event.name}
          >
            <h4 className="text-xl">
              <a href={event.url}>{event.name}</a>
            </h4>
            <p>location: {event.location}</p>
          </div>
        ))}
      </ul>
      <h2 className="text-2xl">Past Events</h2>
      <ul>
        {data.myPastEvents.nodes.map(event => (
          <div
            className="m-2 p-2 rounded border-2 border-red-500"
            key={event.name}
          >
            <h4 className="text-xl">
              <a href={event.url}>{event.name}</a>
            </h4>
            <p>location: {event.location}</p>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Events

export const query = graphql`
  {
    myFutureEvents: allEvent(
      filter: { collection: { eq: "future" } }
      sort: { fields: startDate, order: ASC }
    ) {
      nodes {
        name
        location
        url
      }
    }
    myPastEvents: allEvent(
      filter: { collection: { eq: "past" } }
      sort: { fields: startDate, order: ASC }
    ) {
      nodes {
        name
        location
        url
      }
    }
  }
`
