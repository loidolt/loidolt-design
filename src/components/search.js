import React from "react";
import { connectSearchBox, connectHits } from "react-instantsearch-dom";
import Post from "../components/post";

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

const Hits = ({ hits }) => (
  <>
    {hits.map(hit => {
      const { id, title, path, date, coverImage, excerpt, tags } = hit;

      return (
        <Post
          key={id}
          title={title}
          date={date}
          path={path}
          coverImage={coverImage}
          tags={tags}
          excerpt={excerpt}
        />
      );
    })}
  </>
);

export const CustomHits = connectHits(Hits);
