import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  Hits,
  Configure,
  Highlight,
  connectStateResults,
  connectSearchBox,
} from 'react-instantsearch-dom'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'

const searchClient = algoliasearch(
  'RLTU8HW1H7',
  '7038bb8ae4a108d1e4789b53dfe38524'
)

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
  },
  searchIcon: {
    color: '#ffffff',
  },
  searchBox: {
    width: '100%',
    maxWidth: 800,
    padding: 20,
    backgroundColor: '#333333',
    borderColor: '#333333',
  },
  searchInput: {
    color: '#ffffff',
    borderColor: '#ffffff',
  },
  searchInputLabel: {
    color: '#ffffff',
    borderColor: '#ffffff',
  },
  popover: {
    backgroundColor: '#333333',
  },
  resultPaper: {
    padding: 10,
    backgroundColor: '#515151',
    maxWidth: 800,
  },
}))

export default function Search() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const Results = connectStateResults(
    ({ searchState, searchResults, children }) =>
      searchState && searchState.query
        ? searchResults && searchResults.nbHits !== 0
          ? children
          : 'No joy, please try again'
        : ''
  )

  const open = Boolean(anchorEl)
  const id = open ? 'search-results' : undefined

  return (
    <InstantSearch searchClient={searchClient} indexName="posts">
      <Configure hitsPerPage={4} />

      <IconButton
        aria-label="search"
        className={classes.search}
        onClick={handleClick}
      >
        <SearchIcon className={classes.searchIcon} />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{ className: classes.popover }}
      >
        <CustomSearchBox
          translations={{
            placeholder: 'Search Projects',
          }}
        />
        <Results>
          <Hits hitComponent={Hit} />
        </Results>
      </Popover>
    </InstantSearch>
  )
}

const OverrideSearchBox = ({ currentRefinement, refine }) => {
  const classes = useStyles()

  return (
    <div className={classes.searchBox}>
      <form
        noValidate
        action=""
        role="search"
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <TextField
          fullWidth
          type="search"
          id="search-projects"
          label="Search Projects"
          variant="outlined"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
          InputProps={{
            classes: {
              root: classes.searchInput,
              focused: classes.searchInput,
              notchedOutline: classes.searchInput,
            },
          }}
          InputLabelProps={{
            classes: {
              root: classes.searchInputLabel,
              focused: classes.searchInputLabel,
              notchedOutline: classes.searchInputLabel,
            },
          }}
        />
      </form>
    </div>
  )
}

const CustomSearchBox = connectSearchBox(OverrideSearchBox)

function Hit(props) {
  const classes = useStyles()

  return (
    <Paper key={props.hit.id} className={classes.resultPaper}>
      <Link to={props.hit.path}>
        <Typography variant="h5" component="h4">
          <Highlight attribute="title" hit={props.hit} />
        </Typography>
        <Typography variant="caption">
          <Highlight attribute="date" hit={props.hit} />
        </Typography>
        <Typography variant="body2" component="p">
          <Highlight attribute="excerpt" hit={props.hit} />
        </Typography>
      </Link>
    </Paper>
  )
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
}
