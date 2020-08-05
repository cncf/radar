import MarkdownComponent from './MarkdownComponent'
import OutboundLink from './OutboundLink'
import css from 'styled-jsx/css'

const { className, styles } = css.resolve`
  a { 
    margin-left: 5px;
    margin-right: 5px; 
  }
`

export default function RadarTeam({ team }) {
  return <div className="team">
    <style jsx>{`
      .team {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-top: 30px;
      }
      
      .team-member {
        width: 380px;
        margin-bottom: 30px;
        text-align: center;
      }
      
      .member-photo {
        border-radius: 50%;
        width: 100px;
      }
      
      .member-bio { 
        width: 300px;
        text-align: center;
        margin: 0 auto;
        font-size: 0.95rem;
      }
    `}</style>
    {styles}

    {
      team.map(member => {
        return <div key={member.name} className="team-member">
          <img src={`/photos/${member.photo}`} alt={member.name} className="member-photo" />
          <h5>{member.name}</h5>
          <div>{member.title}</div>
          {member.twitter && <OutboundLink href={`https://twitter.com/${member.twitter}`} className={className}>
            <i className="fab fa-twitter"></i>
          </OutboundLink>}

          {member.linkedin && <OutboundLink href={`https://linkedin.com/${member.linkedin}`} className={className}>
            <i className="fab fa-linkedin"></i>
          </OutboundLink>}

          {member.github && <OutboundLink href={`https://github.com/${member.github}`} className={className}>
            <i className="fab fa-github"></i>
          </OutboundLink>}

          {member.bio && <div className="member-bio">
            <MarkdownComponent value={member.bio}/>
          </div>}
        </div>
      })
    }
  </div>
}
