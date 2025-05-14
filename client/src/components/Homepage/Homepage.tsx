import Hero from './Hero';
import KeyPoints from './KeyPoints';
import DesignVariations from './DesignVariation';
import Builder from '../Builder/Builder';
import Footer from '../Footer/Footer';

const Home = () => {
    return <>
        <Hero />
        <Builder />
        <KeyPoints />
        <DesignVariations />
        <Footer />
    </>
}

export default Home;

