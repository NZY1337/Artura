import Hero from './Hero';
import KeyPoints from './KeyPoints';
import DesignVariations from './DesignVariation';
import Footer from '../Footer/Footer';
import HomeServicesPreview from './HomeServicesPreview';
import CompareSlider from '../UtilityComponents/CompareSlider';
import PricingSection from './PricingPlan';
import Carousel from '../UtilityComponents/Carousel';
import TwoImageLayout from './Something';

const Home = () => {
    return <>
        <Hero />
        <HomeServicesPreview />
        <CompareSlider />
        <KeyPoints />
        <Carousel />
        <DesignVariations />
        <TwoImageLayout />
        <PricingSection />
        <Footer />
    </>
}

export default Home;

