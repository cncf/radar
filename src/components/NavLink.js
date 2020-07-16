import { Fragment, forwardRef } from 'react'
import { colors } from '../styles.config'

export default forwardRef((props, ref) => {
  return <Fragment>
    <style jsx>{`
        a, a:hover, a:focus, a:visited {
          color: white;
          background: ${colors.darkPurple};
          outline: none;
        }
        
        a:hover {
          color: ${colors.pink};
        }
    `}
    </style>
    <a className="navbar-item" {...props} ref={ref}>{props.children}</a>
  </Fragment>
})
