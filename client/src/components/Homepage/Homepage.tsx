import Hero from './Hero';
import KeyPoints from './KeyPoints';
import DesignVariations from './DesignVariation';
import Footer from '../Footer/Footer';
import HomeServicesPreview from './HomeServicesPreview';
import CompareSlider from '../UtilityComponents/CompareSlider';
import PricingSection from './PricingPlan';
import TwoImageLayout from './Something';
import LatestProjects from './LatestProjects/LatestProjects';

const Home = () => {
    return <>
        <Hero />
        <HomeServicesPreview />
        <CompareSlider />
        <KeyPoints />
        <LatestProjects />
        <DesignVariations />
        <TwoImageLayout />
        <PricingSection />
        <Footer />
    </>
}

export default Home;

