import { notes, principles, profile, projects } from "./site-data";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark">{profile.initials}</span>
          <span className="brand-name">{profile.name}</span>
        </a>

        <nav className="nav" aria-label="主导航">
          <a href="#about">关于</a>
          <a href="#work">项目</a>
          <a href="#notes">随笔</a>
        </nav>

        <a className="header-contact" href="#contact">
          联系我 <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> {profile.availability}
          </p>
          <h1>
            Ideas into
            <span>something real.</span>
          </h1>
          <p className="hero-headline">{profile.headline}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              查看项目 <span aria-hidden="true">↓</span>
            </a>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-art" aria-label={`${profile.name} 的个人名片`}>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-card">
            <div className="art-card-top">
              <span>Portfolio</span>
              <span>©26</span>
            </div>
            <div className="monogram">{profile.initials}</div>
            <div className="art-card-bottom">
              <span>{profile.role}</span>
              <span className="mini-arrow">↗</span>
            </div>
          </div>
          <div className="art-label label-one">思考</div>
          <div className="art-label label-two">创造</div>
          <div className="art-label label-three">分享</div>
        </div>

        <div className="hero-meta">
          <span>{profile.location}</span>
          <span>Scroll to explore</span>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...principles, ...principles].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item} <b>✦</b>
            </span>
          ))}
        </div>
      </div>

      <section className="section about" id="about">
        <div className="section-label">
          <span>01</span>
          <span>About</span>
        </div>
        <div className="about-content">
          <p className="about-lead">{profile.intro}</p>
          <div className="about-detail">
            <p>
              你可以在这里补充自己的经历、擅长领域和正在寻找的机会。两到三段真诚、具体的文字，通常比一长串标签更有力量。
            </p>
            <p>
              这个网站把内容与样式分开了。以后只需要修改资料文件，就能更新姓名、简介、项目、文章和联系方式。
            </p>
            <a className="inline-link" href="#contact">
              进一步了解我 <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section work" id="work">
        <div className="section-heading">
          <div className="section-label light">
            <span>02</span>
            <span>Selected work</span>
          </div>
          <h2>一些值得<br />展开说的事。</h2>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <a className={`project-card ${project.tone}`} href={project.href} key={project.number}>
              <div className="project-topline">
                <span>{project.number}</span>
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <div className="project-shape" aria-hidden="true">
                <span>{project.number}</span>
              </div>
              <div className="project-copy">
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
        <div className="notes-intro">
          <div className="section-label">
            <span>03</span>
            <span>Notes</span>
          </div>
          <h2>写下过程，<br />也写下变化。</h2>
          <p>项目展示结果，文字保留路径。这里可以连接到你的博客、公众号文章或学习笔记。</p>
        </div>
        <div className="notes-list">
          {notes.map((note, index) => (
            <a href={note.href} className="note-row" key={note.title}>
              <span className="note-number">0{index + 1}</span>
              <span className="note-main">
                <span className="note-topic">{note.topic}</span>
                <strong>{note.title}</strong>
              </span>
              <span className="note-date">{note.date}</span>
              <span className="note-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="contact-kicker">Have an idea?</p>
        <h2>一起聊聊，<br />也许会有好事发生。</h2>
        <a className="contact-link" href={`mailto:${profile.email}`}>
          {profile.email} <span aria-hidden="true">↗</span>
        </a>
        <p className="contact-hint">这是示例邮箱，请在 site-data.ts 中替换。</p>
        <div className="contact-circle" aria-hidden="true">HELLO</div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">{profile.initials}</span>
          <span className="brand-name">{profile.name}</span>
        </a>
        <p>持续学习，认真创造。</p>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href="#top">回到顶部 ↑</a>
        </div>
      </footer>
    </main>
  );
}
