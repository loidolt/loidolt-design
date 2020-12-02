import React, { useState } from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Stats,
} from "react-instantsearch-dom";

import TagCloud from "../components/tagcloud";
import { CustomHits } from "../components/search";

const searchClient = algoliasearch(
  "RLTU8HW1H7",
  "7038bb8ae4a108d1e4789b53dfe38524",
);

const Search = () => {
  // Search
  const [hasInput, setInput] = useState(false);

  return (
    <>
      <SEO />
      <Layout>
        <InstantSearch searchClient={searchClient} indexName="posts">
          <Configure hitsPerPage={10} />

          <div className="infoBanner">
            <SearchBox
              translations={{
                placeholder: "Search Projects",
              }}
              onReset={event => {
                setInput(false);
              }}
              onKeyUp={event => {
                setInput(event.currentTarget.value !== "");
              }}
            />
            <div className={!hasInput ? "hidden" : ""}>
              <Stats />
            </div>
          </div>

          <div className={!hasInput ? "hidden" : ""}>
            <CustomHits hitComponent={Hits} />
          </div>
          <div className={hasInput ? "hidden" : ""}>
            ^ You have to type stuff up here ^
          </div>
        </InstantSearch>
        <br />
        <TagCloud />
      </Layout>
    </>
  );
};

Search.propTypes = {};

export default Search;
