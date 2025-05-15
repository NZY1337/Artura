import Hero from './Hero';
import KeyPoints from './KeyPoints';
import DesignVariations from './DesignVariation';
import Footer from '../Footer/Footer';
import HomeServicesPreview from './HomeServicesPreview';
import CompareSlider from '../UtilityComponents/CompareSlider';
import PricingSection from './PricingPlan';
import Carousel from '../UtilityComponents/Carousel';

const Home = () => {
    return <>
        <Hero />
        <HomeServicesPreview />
        <CompareSlider />
        <Carousel />
        <DesignVariations />
        <KeyPoints />
        <PricingSection />
        <Footer />
    </>
}

export default Home;

