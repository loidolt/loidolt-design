import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

import style from "../styles/tagcloud.module.css";

const TagCloud = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          totalCount
          fieldValue
        }
      }
    }
  `);

  let tags = data.allMarkdownRemark.group;

  return (
    <div className={style.tagcloud}>
      <ul className={style.taglist}>
        {tags.map(tag => {
          const { totalCount, fieldValue } = tag;

          return (
            <li key={fieldValue} className={style.tag}>
              <Link to={"/tag/" + fieldValue} className={style.link}>
                <span>{"#" + fieldValue + " "}</span>
                <span className={style.count}>{totalCount}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagCloud;
