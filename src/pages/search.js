import React, { useState } from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import Post from "../components/post";
import Navigation from "../components/navigation";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from "react-instantsearch-dom";

import { CustomHits } from "../components/search";

import "../styles/layout.css";

const searchClient = algoliasearch(
  "RLTU8HW1H7",
  "7038bb8ae4a108d1e4789b53dfe38524",
);

const Search = () => {
  // Search
  const [hasInput, setInput] = useState(false);

  const ClickOutHandler = require("react-onclickout");
  const onClickOut = () => {
    document.getElementsByClassName("ais-SearchBox-input")[0].value = "";
    setInput(false);
  };

  return (
    <>
      <SEO />
      <Layout>
        <ClickOutHandler onClickOut={onClickOut}>
          <InstantSearch searchClient={searchClient} indexName="posts">
            <Configure hitsPerPage={5} />

            <div className="infoBanner">
              <SearchBox
                showLoadingIndicator
                className="searchbox"
                class="ais-SearchBox-input"
                submit={<></>}
                reset={<></>}
                translations={{
                  placeholder: "Search Projects",
                }}
                onKeyUp={event => {
                  setInput(event.currentTarget.value !== "");
                }}
              />
            </div>

            {/*forcefeed className because component does not accept natively as prop*/}
            <div className={!hasInput ? "input-empty" : "input-value"}>
              <CustomHits hitComponent={Hits} />
            </div>
          </InstantSearch>
        </ClickOutHandler>
      </Layout>
    </>
  );
};

Search.propTypes = {};

export default Search;
