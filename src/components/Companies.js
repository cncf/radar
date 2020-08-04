import { sizes } from '../styles.config'

export default function Companies({ companies }) {
  return <div className="wrapper">
    <style jsx>{`
        .wrapper {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        img {
          width: 100px;
          height: 100px;
        }
        
        @media only screen and (max-width: ${sizes.mobile}px) {
          img {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>

    { companies.map(company => <img src={`/${company.logoPath}`} alt={company.name} key={company.key} />) }
  </div>
}
