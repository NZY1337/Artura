import Hero from './Hero';
import KeyPoints from './KeyPoints';
import DesignVariations from './DesignVariation';
import Footer from '../Footer/Footer';
import HomeServicesPreview from './HomeServicesPreview';
import CompareSlider from '../UtilityComponents/CompareSlider';
import { SuccessMetricsSection } from './Something';
import Carousel from '../UtilityComponents/Carousel';

const Home = () => {
    return <>
        <Hero />
        <HomeServicesPreview />
        <CompareSlider />
        <Carousel />

        <DesignVariations />
        <KeyPoints />
        <SuccessMetricsSection />
        <Footer />
    </>
}

export default Home;

