// import s from './style.module.css';
import Layout from '../../components/Layout';
import bg1 from '../../assets/bg1.jpg';

const AboutPage = () => {
  return (
    <>
      <Layout title="About" desc="..." urlBg={bg1}>
        <p>Some text about...</p>
      </Layout>
    </>
  );
};

export default AboutPage;
