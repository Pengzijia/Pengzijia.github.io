import { notes, principles, profile, projects } from "./site-data";

const organelles = ["α", "β", "γ", "δ", "ε"];

export default function Home() {
  return (
    <main className="bio-site">
      <div className="bio-noise" aria-hidden="true" />
      <div className="ambient-spore ambient-spore-one" aria-hidden="true" />
      <div className="ambient-spore ambient-spore-two" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark"><i /></span>
          <span className="brand-name">{profile.name}</span>
          <span className="brand-code">/ BIO.026</span>
        </a>

        <nav className="nav" aria-label="主导航">
          <a href="#about"><span>01</span> 关于</a>
          <a href="#work"><span>02</span> 项目</a>
          <a href="#notes"><span>03</span> 随笔</a>
        </nav>

        <a className="header-contact" href="#contact">
          <i /> SIGNAL OPEN
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span>LIVE SYSTEM</span>
            <span className="eyebrow-line" />
            <span>PZ / 2026</span>
          </p>
          <h1>
            <span>Ideas</span>
            <span className="outline-word">grow into</span>
            <span>living systems.</span>
          </h1>
          <div className="hero-intro">
            <span className="intro-index">[ 00 ]</span>
            <p>{profile.headline}<br />{profile.intro}</p>
          </div>
          <div className="hero-actions">
            <a className="bio-button" href="#work">
              <span className="button-cell" /> EXPLORE PROJECTS <b>↘</b>
            </a>
            <a className="signal-link" href={profile.github} target="_blank" rel="noreferrer">
              GITHUB SIGNAL <span>↗</span>
            </a>
          </div>
        </div>

        <div className="bio-vessel" aria-label={`${profile.name} 的生物形态数字名片`}>
          <div className="vessel-grid" aria-hidden="true" />
          <div className="vessel-label vessel-label-top">
            <span>SPECIMEN PZ-026</span><span>ACTIVE</span>
          </div>
          <div className="cell-shell" aria-hidden="true">
            <div className="cell-membrane membrane-one" />
            <div className="cell-membrane membrane-two" />
            <div className="cell-nucleus">
              <span>{profile.initials}</span>
              <i />
            </div>
            {organelles.map((item, index) => (
              <div className={`organelle organelle-${index + 1}`} key={item}>
                <span>{item}</span>
              </div>
            ))}
            <div className="cell-filament filament-one" />
            <div className="cell-filament filament-two" />
          </div>
          <div className="scan-line" aria-hidden="true" />
          <div className="vessel-label vessel-label-bottom">
            <span>{profile.role}</span><span>VIABILITY 98.6%</span>
          </div>
        </div>

        <div className="hero-meta">
          <span><i /> {profile.availability}</span>
          <span>{profile.location}</span>
          <span>SCROLL TO CULTIVATE ↓</span>
        </div>
      </section>

      <div className="gene-strip" aria-hidden="true">
        <div className="gene-track">
          {[...principles, ...principles, ...principles].map((item, index) => (
            <span key={`${item}-${index}`}><b>●</b> {item} <i>ATCG-{index + 1}</i></span>
          ))}
        </div>
      </div>

      <section className="section about" id="about">
        <div className="section-index">
          <span>01</span>
          <small>ABOUT / ORIGIN</small>
        </div>
        <div className="about-main">
          <p className="section-kicker">Curiosity is the first organism.</p>
          <h2>在好奇心的培养皿里，<br />让想法持续变异、生长。</h2>
          <div className="about-copy">
            <p>{profile.intro}</p>
            <p>我喜欢把模糊的问题拆开观察，再把技术、设计与表达重新组合成能够真正被使用的东西。</p>
          </div>
        </div>

        <aside className="bio-readout">
          <div className="readout-head"><span>ORGANISM PROFILE</span><i /></div>
          <div className="readout-cell">
            <div className="micro-cell"><span>{profile.initials}</span></div>
            <div><small>IDENTITY</small><strong>{profile.name}</strong></div>
          </div>
          <dl>
            <div><dt>MODE</dt><dd>EXPLORING</dd></div>
            <div><dt>HABITAT</dt><dd>CHINA / REMOTE</dd></div>
            <div><dt>SIGNAL</dt><dd>OPEN TO CONNECT</dd></div>
            <div><dt>EVOLUTION</dt><dd>CONTINUOUS</dd></div>
          </dl>
          <div className="trait-cloud" aria-hidden="true">
            {principles.map((item, index) => <span key={item} className={`trait-${index + 1}`}>{item}</span>)}
          </div>
        </aside>
      </section>

      <section className="section work" id="work">
        <div className="work-heading">
          <div className="section-index light">
            <span>02</span>
            <small>SELECTED / MUTATIONS</small>
          </div>
          <h2>Selected<br /><span>organisms.</span></h2>
          <p>每个项目都是一次受控变异：观察问题，形成假设，生长出新的结构。</p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <a className={`project-card specimen-${index + 1}`} href={project.href} key={project.number}>
              <div className="project-topline">
                <span>SPECIMEN / {project.number}</span>
                <span>{project.year}</span>
              </div>
              <div className="project-organism" aria-hidden="true">
                <div className="organism-body"><span>{project.number}</span></div>
                <i className="satellite satellite-a" />
                <i className="satellite satellite-b" />
                <i className="satellite satellite-c" />
              </div>
              <div className="project-copy">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-footer">
                <div className="tag-list">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section notes" id="notes">
        <div className="notes-heading">
          <div className="section-index">
            <span>03</span>
            <small>FIELD / NOTES</small>
          </div>
          <h2>观察记录</h2>
          <p>一些关于创造、学习与变化的切片。</p>
        </div>
        <div className="notes-list">
          {notes.map((note, index) => (
            <a href={note.href} className="note-row" key={note.title}>
              <span className="note-spore"><i /></span>
              <span className="note-number">REC.0{index + 1}</span>
              <span className="note-main">
                <small>{note.topic}</small>
                <strong>{note.title}</strong>
              </span>
              <span className="note-date">{note.date}</span>
              <span className="note-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-organism" aria-hidden="true">
          <div className="contact-core">HELLO</div>
          <div className="contact-ring ring-a" />
          <div className="contact-ring ring-b" />
          <div className="contact-ring ring-c" />
        </div>
        <p className="contact-kicker"><i /> NEW CONNECTION / POSSIBLE</p>
        <h2>Let&apos;s create<br />something <span>alive.</span></h2>
        <a className="contact-link" href={`mailto:${profile.email}`}>
          {profile.email} <span>↗</span>
        </a>
        <p className="contact-hint">示例邮箱，请在 site-data.ts 中替换。</p>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark"><i /></span>
          <span className="brand-name">{profile.name}</span>
        </a>
        <p>GROWING DIGITAL ORGANISMS SINCE 2026</p>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href="#top">TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
