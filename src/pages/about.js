import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"

const About = () => {
  const data = useStaticQuery(graphql`
    {
      headerImage: file(relativePath: { eq: "library-books.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      bodyImage: file(relativePath: { eq: "library-books-2.jpg" }) {
        childImageSharp {
          fixed(width: 400) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div className="container mx-auto">
      <p className="text-xl text-red-500">About this Website</p>
      <div className="container">
        <Img fluid={data.headerImage.childImageSharp.fluid} alt="Books" />
      </div>
      <div className="container">
        <Img fixed={data.bodyImage.childImageSharp.fixed} alt="Books 2" />
      </div>
    </div>
  )
}

export default About
