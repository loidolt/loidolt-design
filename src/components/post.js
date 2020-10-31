import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Navigation from "./navigation";
import { toKebabCase } from "../helpers";

import style from "../styles/post.module.css";

const Post = ({
  title,
  date,
  path,
  coverImage,
  excerpt,
  tags,
  repolink,
  modellink,
  attributionlink,
  html,
  photos,
  previousPost,
  nextPost,
}) => {
  const previousPath = previousPost && previousPost.frontmatter.path;
  const previousLabel = previousPost && previousPost.frontmatter.title;
  const nextPath = nextPost && nextPost.frontmatter.path;
  const nextLabel = nextPost && nextPost.frontmatter.title;

  console.log(photos);

  return (
    <div className={style.post}>
      <div className={style.postContent}>
        <h1 className={style.title}>
          {excerpt ? <Link to={path}>{title}</Link> : title}
        </h1>
        <div className={style.meta}>
          {date}
          {tags ? (
            <div className={style.tags}>
              {tags.map(tag => (
                <Link to={`/tag/${toKebabCase(tag)}/`} key={toKebabCase(tag)}>
                  <span className={style.tag}>#{tag}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {coverImage && (
          <Img
            fluid={coverImage.childImageSharp.fluid}
            className={style.coverImage}
          />
        )}

        <div className={style.buttonArea}>
          {repolink && (
            <form action={repolink} target="_blank">
              <input
                type="submit"
                className={style.button}
                value="Repository"
              />
            </form>
          )}
          {modellink && (
            <form action={modellink} target="_blank">
              <input type="submit" className={style.button} value="3D Model" />
            </form>
          )}
          {attributionlink && (
            <form action={attributionlink} target="_blank">
              <input
                type="submit"
                className={style.button}
                value="Attribution"
              />
            </form>
          )}
        </div>

        {excerpt ? (
          <>
            <p>{excerpt}</p>
            <Link to={path} className={style.readMore}>
              Read more →
            </Link>
          </>
        ) : (
          <>
            <div dangerouslySetInnerHTML={{ __html: html }} />

            {photos &&
              photos.map(({ node }) => (
                <Img
                  key={node.base}
                  fluid={node.childImageSharp.fluid}
                  className={style.coverImage}
                />
              ))}

            <Navigation
              previousPath={previousPath}
              previousLabel={previousLabel}
              nextPath={nextPath}
              nextLabel={nextLabel}
            />
          </>
        )}
      </div>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  path: PropTypes.string,
  coverImage: PropTypes.object,
  excerpt: PropTypes.string,
  html: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  repolink: PropTypes.string,
  modellink: PropTypes.string,
  attributionlink: PropTypes.string,
  previousPost: PropTypes.object,
  nextPost: PropTypes.object,
};

export default Post;
