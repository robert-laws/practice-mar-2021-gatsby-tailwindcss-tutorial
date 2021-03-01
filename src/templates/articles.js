import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Pagination from "../components/pagination"

const Articles = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <>
      <section>
        <h2>Articles</h2>
        <ul>
          {posts.map(({ node }, index) => (
            <li key={index}>
              {node.frontmatter.featimg && (
                <figure>
                  <Link to={node.fields.slug}>
                    <Img
                      fixed={node.frontmatter.featimg.childImageSharp.fixed}
                      alt={node.frontmatter.title}
                    />
                  </Link>
                </figure>
              )}

              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </li>
          ))}
        </ul>
      </section>
      <Pagination pageContext={pageContext} />
    </>
  )
}

export default Articles

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt
          id
          frontmatter {
            title
            date
            subject
            author
            featimg {
              childImageSharp {
                fixed(width: 400, height: 400, cropFocus: ATTENTION) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
