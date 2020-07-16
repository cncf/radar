import { useContext, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import SearchContext from '../contexts/SearchContext'
import NavLink from './NavLink'

const Search = _  => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext)
  const [searching, setSearching ] = useState(false)
  const router = useRouter()
  const onChange = ({ target }) => {
    if (router.pathname !== '/overview') {
      router.push('/overview')
    }
    setSearchQuery(target.value)
  }
  const resetSearch = _ => {
    setSearchQuery('')
    setSearching(false)
  }

  return <Fragment>
    <style jsx>{`
      .control {
        margin-top: -5px;
      }
      
      input {
        margin-top: 5px;
      }
      
      input::placeholder {
        color: #DDDDDD;
        opacity: 1;
      }
      
      .control .icon {
        pointer-events: all;
        color: #DDDDDD !important;
        cursor: pointer;
      }
      
      .control input {
        box-shadow: none;
        background: transparent;
        border: 0 ;
        border-bottom: 1px solid white;
        border-radius: 0;
        color: white;
        margin: 0;
      }
    `}</style>
    { searching &&
      <div className="navbar-item">
        <div className="control has-icons-right">
          <input className="input" type="text" autoComplete="off" placeholder="Search" onChange={onChange} value={searchQuery} />
          <span className="icon is-right" onClick={resetSearch}>
            <i className="fas fa-times"></i>
          </span>
        </div>
      </div>
     }

    { !searching && <NavLink onClick={_ => setSearching(true)}>
      <span className="icon"><i className="fas fa-search"></i></span>
      <span>Search</span>
    </NavLink> }
  </Fragment>
}

export default (Search)
