import { Fragment, useContext, useState, useEffect } from 'react'
import SelectedPointContext from '../contexts/SelectedPointContext'

export default _ => {
  const { selectedPoint, setSelectedPoint } = useContext(SelectedPointContext)
  const [isLoading, setIsLoading] = useState(false)
  const closeModal = _ => setSelectedPoint("")
  const src = `https://deploy-preview-663--landscapeapp.netlify.app/cncf/only-modal=yes&selected=${selectedPoint}`

  useEffect(_ => {
    if (selectedPoint) {
      setIsLoading(true)
    }
  }, [selectedPoint])

  return selectedPoint ? <Fragment>
    <style jsx global>{`
      html, body {
        overflow-y: ${selectedPoint ? 'hidden' : 'auto'}
      }
    `}
    </style>
    <style jsx>{`
      iframe, .loading {
        width: min(100vw - 40px, 1000px);
        height: min(100vh - 40px, 640px);
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 101;
        border-radius: 5px;
      }
      
      iframe {
        display: ${isLoading ? 'none' : 'block'};
      }
      
      .loading {
        background: white;
        font-size: 40px;
        z-index: 100;
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
      }
      
      .loading i {
        margin-right: 10px;
        font-size: 35px;
      }
    
      .modal-background {
        z-index: 100;
        position: fixed;
      }
      
      .modal-close {
        position: fixed;
        z-index: 102;
      }
    `}</style>

    <div className="modal-background" onClick={closeModal}></div>
    {isLoading && <div className="loading">
      <i className="fas fa-spinner fa-spin"></i>
      <span>Loading</span>
    </div>}
    <iframe src={src} onLoad={_ => setIsLoading(false)} />
    <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
  </Fragment> : null
}
