import Link from 'next/link'
import Radar from './Radar'

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
    `}
    </style>

    {radars.map(({ key, name, points }) => {
      return <div key={key} className="thumbnail">
        <Link href="/[radar]" as={`/${key}`}>
          <a>
            {embedThumbnails ? <Radar points={points}/> : <img src={`${key}.svg`}/>}
            <h5>{name}</h5>
          </a>
        </Link>
      </div>
    })}
  </div>
}
