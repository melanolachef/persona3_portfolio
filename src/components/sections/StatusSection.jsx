/** Aba STATUS: ficha do "personagem" — cargo atual, histórico e formação. */
export default function StatusSection({ copy }) {
  const s = copy.status;

  return (
    <div className="scroll-area">
      <header>
        <h3 className="status__name">{s.name}</h3>
        <p className="status__class">{s.class}</p>
        <p className="status__location">{s.location}</p>
      </header>

      <p className="status__bio">{s.bio}</p>

      <section>
        <h4 className="section-label">{s.guildLabel}</h4>
        <div className="entry">
          <span className="entry__primary">{s.guild.org}</span>
          <span className="entry__meta">{s.guild.period}</span>
        </div>
        <p className="entry__secondary">{s.guild.role} · {s.guild.note}</p>
        <ul className="bullets">
          {s.guild.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      </section>

      <section>
        <h4 className="section-label">{s.historyLabel}</h4>
        <div className="stack">
          {s.history.map((job) => (
            <div key={`${job.org}-${job.role}`}>
              <div className="entry">
                <span className="entry__primary">{job.org}</span>
                <span className="entry__meta">{job.period}</span>
              </div>
              <p className="entry__secondary">{job.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="section-label">{s.academicsLabel}</h4>
        <div className="stack">
          {s.academics.map((item) => (
            <div key={item.course}>
              <div className="entry">
                <span className="entry__primary">{item.course}</span>
                <span className="entry__meta">{item.org} · {item.period}</span>
              </div>
              <p className="entry__secondary">
                <span className={`badge${item.state === 'EM ANDAMENTO' || item.state === 'IN PROGRESS' ? ' badge--active' : ''}`}>
                  {item.state}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="section-label">{s.languagesLabel}</h4>
        <p className="entry__secondary">{s.languages}</p>
      </section>
    </div>
  );
}
