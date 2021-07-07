import Link from 'next/link'
import Radar from './Radar'
import { sizes } from '../styles.config'

export default function ThumbnailsList({ radars, embedThumbnails = false }) {
  return <div className="thumbnails">
    <style jsx>{`
      .thumbnails {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 40px;
      }
      
      .thumbnail {
        width: 400px;
        text-align: center;
      }
      
      @media only screen and (max-width: ${sizes.tablet}px) {
        .thumbnails {
          gap: 0;
          flex-direction: column;
          align-content: center;
          margin-bottom: 0.5rem;
          display: block
        }
        
        .thumbnail {
          width: 100%;
          padding-bottom: 10px;
        }

        .preview {
          display: none;
        }
      }
    `}
    </style>

    {radars.map(radar => {
      return radar.subradars.map(({ key, name, points }) => {
        return <div key={key} className="thumbnail">
          <Link href={`/${radar.key}`}>
            <a>
              <span className="preview">{embedThumbnails ? <Radar points={points}/> : <img src={`${key}-raw.svg`}/>}</span>
              <h4>{radar.name} {name ? `(${name})` : null }</h4>
            </a>
          </Link>
        </div>
      })
    })}
  </div>
}
