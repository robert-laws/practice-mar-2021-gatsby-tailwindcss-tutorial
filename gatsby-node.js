const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

/**
 * Events
 */

exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      collection: String!
    }
  `)
}

exports.createResolvers = ({ createResolvers, getNode }) => {
  const collection = source => getNode(source.parent).relativeDirectory

  createResolvers({
    Event: {
      collection: {
        resolve: source => collection(source),
      },
    },
  })
}

/**
 * Articles
 */

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })

    actions.createNodeField({
      node,
      name: `slug`,
      value: `/articles${slug}`,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const queryResult = await graphql(`
    {
      postQuery: allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (queryResult.errors) {
    reporter.panic("error loading articles", queryResult.errors)
    return
  }

  const posts = queryResult.data.postQuery.edges
  posts.forEach(post => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`./src/templates/article.js`),
      context: {
        slug: post.node.fields.slug,
      },
    })
  })
}
