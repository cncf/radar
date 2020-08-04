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
      `}</style>

    { companies.map(company => <img src={`/${company.logoPath}`} alt={company.name} key={company.key} />) }
  </div>
}
