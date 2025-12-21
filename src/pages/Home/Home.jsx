import React from 'react';
import Banner from './Banner/Banner';
import Loader from '../../components/Loader/Loader';
import PopularContests from './PopularContests/PopularContests';
import WinnerSection from './WinnerAdvertisement/WinnerAdvertisement';
import TrustedByCreators from './TrustedByCreators/TrustedByCreators';
import StatsSection from './HomeStats/HomeStats';
import PartnerBrands from './PartnerBrands/PartnarBrands';

const Home = () => {
    return (
        <div>
            <Banner />
            <PartnerBrands></PartnerBrands>
            <PopularContests></PopularContests>
            <WinnerSection></WinnerSection>
            <StatsSection/>
            <TrustedByCreators/>
           
        </div>
    );
};

export default Home;