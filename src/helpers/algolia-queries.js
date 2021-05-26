const pageQuery = ` {
    posts: allMarkdownRemark {
        edges {
          node {
            frontmatter {
              date
              excerpt
              path
              tags
              title
              coverImage {
                publicURL
                name
              }
            }
            html
            id
          }
        }
      }
  }
`;
const flatten = (arr) =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }));
const settings = { attributesToSnippet: [`excerpt:20`] };
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `posts`,
    settings,
  },
];
module.exports = queries;
