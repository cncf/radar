import { forwardRef } from 'react'
import { colors } from '../styles.config'

export default forwardRef((props, ref) => {
  return <>
    <style jsx>{`
        a, a:hover, a:focus, a:visited, a:active {
          color: white;
          background: ${colors.black};
        }
        
        a:hover {
          color: ${colors.pink};
          text-decoration: none;
        }
    `}
    </style>
    <a className="navbar-item" {...props} ref={ref}>{props.children}</a>
  </>
})
