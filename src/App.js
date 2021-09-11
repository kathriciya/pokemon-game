import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './components/Layout';
import bg1 from './assets/bg1.jpg';
console.log('bg1: ', bg1);

const App = () => {
  return (
    <>
      <Header title="This is title" desc="This is Description!" />
      <Layout title="Название" desc="Описание" urlBg={bg1} />
      <Layout title="Название" desc="Описание" colorBg="green" />
      <Layout title="Название" desc="Описание" urlBg={bg1} />
      <Footer />
    </>
  );
};

export default App;
