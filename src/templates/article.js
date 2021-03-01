import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"

const Article = ({ data }) => {
  const article = data.markdownRemark

  return (
    <div className="m-2 p-2 rounded border-2 border-teal-500">
      <h4 className="text-xl">{article.frontmatter.title}</h4>
      <div className="w-64">
        {article.frontmatter.featimg && (
          <Img
            fluid={article.frontmatter.featimg.childImageSharp.fluid}
            alt={article.frontmatter.title}
          />
        )}
      </div>
      <p>author: {article.frontmatter.author}</p>
      <hr />
      <div className="p-4" dangerouslySetInnerHTML={{ __html: article.html }} />
    </div>
  )
}

export default Article

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        subject
        author
        featimg {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
