import Hero from './Hero';
import KeyPoints from './KeyPoints';
import DesignVariations from './DesignVariation';
import Builder from '../Builder/Builder';
import Footer from '../Footer/Footer';
import { Example } from '../../context/TanstackQuery';

const Home = () => {
    return <>
        <Hero />
        <Example />
        <Builder />
        <KeyPoints />
        <DesignVariations />
        <Footer />
    </>
}

export default Home;

