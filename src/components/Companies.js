import OutboundLink from "./OutboundLink";

export default function Companies({ companies }) {
  return <div className="wrapper">
    <style jsx>{`
        .wrapper {
          display: flex;
          gap: 5px 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        img {
          width: 80px;
          height: 80px;
        }
      `}</style>

    { companies.map(company => <OutboundLink key={company.key} href={company.homepage}>
      <img src={`/logos/${company.logo}`} alt={company.name} />
    </OutboundLink>) }
  </div>
}
