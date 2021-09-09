import s from './style.module.css';
console.log('s: ', s);

const Layout = ({ title, desc, urlBg, colorBg }) => {
  const layotBg = urlBg
    ? { backgroundImage: `url("${urlBg}")` }
    : { background: `${colorBg}` };
  return (
    <>
      <section className={s.root} style={layotBg}>
        <div className={s.wrapper}>
          <article>
            <div className={s.title}>
              <h3>{title}</h3>
              <span className="separator"></span>
            </div>
            <div className={`{${s.desc}}, ${s.full}`}>
              <p>{desc}</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Layout;
