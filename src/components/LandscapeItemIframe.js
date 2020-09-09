import { useContext, useState, useEffect } from 'react'
import SelectedPointContext from '../contexts/SelectedPointContext'

export default function LandscapeItemIframe() {
  const { selectedPoint, setSelectedPoint } = useContext(SelectedPointContext)
  const [isLoading, setIsLoading] = useState(false)
  const [visitedPoints, setVisitedPoints] = useState(new Set())
  const closeModal = _ => setSelectedPoint('')
  const isOpen = selectedPoint !== ''

  useEffect(_ => {
    if (selectedPoint && !visitedPoints.has(selectedPoint)) {
      setIsLoading(true)
      setVisitedPoints(new Set([...visitedPoints, selectedPoint]))
    }
  }, [selectedPoint])

  return <div className={isOpen ? null : 'hidden'}>
    <style jsx global>{`
      html, body {
        overflow-y: ${selectedPoint ? 'hidden' : 'auto'}
      }
    `}
    </style>
    <style jsx>{`
      .hidden {
        // Use opacity to hide modal, otherwise it's re-rendered.
        opacity: 0;
        z-index: -10000;
      }

      .modal-content {
        width: min(100vw - 40px, 1000px);
        height: min(100vh - 40px, 640px);
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 101;
        border-radius: 5px;
        margin: 0;
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
    {!selectedPoint && <div className="modal-content center">
      <span>No associated data found</span>
    </div>}

    { [...visitedPoints].map(point => {
      // We only want to load each iframe once.
      const src = `https://landscape.cncf.io/only-modal=yes&selected=${point}`
      const className = point === selectedPoint && !isLoading ? null : 'hidden'
      return <iframe className={`modal-content ${className}`} onLoad={_ => setIsLoading(false)} src={src} key={point} />
    }) }

    <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
  </div>
}
