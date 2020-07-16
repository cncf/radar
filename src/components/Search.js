import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import SearchContext from '../contexts/SearchContext'

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

  return <span className="navbar-item">
    <style jsx>{`
      input {
        margin-top: 5px;
      }
            
      a, a:hover, a:focus, a:visited {
        color: white;
        background: #0F1433;
      }
      
      a:hover {
        color: #e00a6b;
      }
      
      .control {
        margin-top: -5px;
      }
      
      input::placeholder {
        color: #DDDDDD;
        opacity: 1;
      }
      
      .control .icon {
        pointer-events: all;
        color: #DDDDDD !important;
      }
      
      .control input {
        box-shadow: none;
        background: #0F1433;
        border: 0 ;
        border-bottom: 1px solid white;
        border-radius: 0;
        color: white;
        margin: 0;
      }
    `}</style>
    { searching &&
        <div className="control has-icons-right">
          <input className="input" type="text" autoComplete="off" placeholder="Search" onChange={onChange} value={searchQuery} />
          <span className="icon is-right" onClick={resetSearch}>
            <i className="fas fa-times"></i>
          </span>
        </div>
     }

    { !searching && <a onClick={_ => setSearching(true)}><span className="icon"><i className="fas fa-search"></i></span> Search</a> }
  </span>
}

export default (Search)
