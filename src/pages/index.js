import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

export default function Home() {
  const query = useStaticQuery(graphql`
    query SiteMenuQuery {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)

  return (
    <div className="container mx-auto">
      <nav>
        {query.site.siteMetadata.menuLinks.map(item => (
          <li key={item.name}>
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
      </nav>
      <p className="text-xl text-red-500">Hello world!</p>
    </div>
  )
}
