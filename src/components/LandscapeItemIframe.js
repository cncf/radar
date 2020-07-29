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

  if (selectedPoint === "") {
    return null;
  }

  return <Fragment>
    <style jsx global>{`
      html, body {
        overflow-y: ${selectedPoint ? 'hidden' : 'auto'}
      }
    `}
    </style>
    <style jsx>{`
      .modal-content {
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
      
      .modal-content.center {
        background: white;
        font-size: 32px;
        z-index: 100;
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
      }
      
      .modal-content i {
        margin-right: 10px;
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
    {isLoading && <div className="modal-content center">
      <i className="fas fa-spinner fa-spin"></i>
      <span>Loading</span>
    </div>}
    {selectedPoint ?
      <iframe className="modal-content" src={src} onLoad={_ => setIsLoading(false)} /> :
      <div className="modal-content center">
        <span>No associated data found</span>
      </div>
    }

    <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
  </Fragment>
}
