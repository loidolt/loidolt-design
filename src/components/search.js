import React from "react";
import { connectSearchBox, connectHits } from "react-instantsearch-dom";

const SearchBox = ({ currentRefinement, refine }) => (
  <div className="ais-SearchBox">
    <form noValidate action="" role="search" className="ais-SearchBox-form">
      <input
        className="ais-SearchBox-input"
        type="search"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
      />
    </form>
  </div>
);

export const CustomSearchBox = connectSearchBox(SearchBox);

// print out first and last characters around search term
const getSnippet = (excerpt, match) => {
  const index = excerpt.indexOf(match);
  return excerpt.substring(index - 50, index + 50);
};
// only display Hits when user types in SearchBox

const Hits = ({ hits }) => (
  <ul className="style">
    {console.log(hits)}
    {hits.map(hit => (
      <li key={hit.title}>
        <a href={hit.path}>
          {hit.title}
          {/* <p>
            {`...${getSnippet(
              hit.excerpt,
              hit._highlightResult.title.matchedWords[0],
            )}...`}
          </p> */}
        </a>
      </li>
    ))}
  </ul>
);

export const CustomHits = connectHits(Hits);
