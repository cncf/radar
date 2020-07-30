export default function VideoComponent({ src }) {
  return <div className="video-container">
    <style jsx>{`
      .video-container {
        overflow: hidden;
        position: relative;
        width:100%;
        max-width: 800px;
        margin: auto;
      }
      
      .video-container::after {
        padding-top: 56.25%;
        display: block;
        content: '';
      }
      
      .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }    
    `}
    </style>

    <iframe src={src} frameBorder="0" allowFullScreen
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
  </div>

}
