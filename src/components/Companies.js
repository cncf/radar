export default function Companies({ companies }) {
  return <div className="wrapper">
    <style jsx>{`
        .wrapper {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>

    { companies.map(company => <img src={`/${company.imagePath}`} alt={company.name} key={company.id} />) }
  </div>
}
