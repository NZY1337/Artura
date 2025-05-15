import AIBuilder from './AIBuilder';
import SectionWrapper from '../UtilityComponents/SectionWrapper';
import PulsatingIconTitleWrapper from '../UtilityComponents/PulsatingIconTitleWrapper/PulsatingIconTItleWrapper';

const Builder = () => {
    return (
        <SectionWrapper
        title='AI Builder'
            sx={{
                // backgroundColor: '#111',
            }}
            justify='center'
            innerWidth='xl'
            outerWidth={false}>
            <PulsatingIconTitleWrapper />
            <AIBuilder />
        </SectionWrapper>
    );
};

export default Builder;

