import { useRouter } from 'next/router'
import { Fragment } from "react";

const Search = ({ onSearch, value })  => {
  const router = useRouter()
  const onChange = ({ target }) => {
    if (router.pathname !== '/overview') {
      router.push('/overview')
    }
    onSearch(target.value)
  }
  return <Fragment>
    <style jsx>{`
            input {
              margin-top: 5px;
            }
          `}</style>
    <input className="input" type="text" placeholder="Search" onChange={onChange} value={value} />
  </Fragment>
}

export default (Search)
