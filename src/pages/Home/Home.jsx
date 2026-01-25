import React from 'react';
import Banner from './Banner/Banner';
import Loader from '../../components/Loader/Loader';
import PopularContests from './PopularContests/PopularContests';
import WinnerSection from './WinnerAdvertisement/WinnerAdvertisement';
import TrustedByCreators from './TrustedByCreators/TrustedByCreators';
import StatsSection from './HomeStats/HomeStats';
import PartnerBrands from './PartnerBrands/PartnarBrands';
import FAQ from './FAQ/FAQ';
import Newsletter from './Newsletter/Newsletter';
import Categories from './Categories/Categories';

const Home = () => {
    return (
        <div className='py-6'>
            <Banner />
            <Categories></Categories>
            <PopularContests></PopularContests>
            <WinnerSection></WinnerSection>
            <StatsSection/>
            <PartnerBrands></PartnerBrands>
            <TrustedByCreators />
            <Newsletter></Newsletter>
            <FAQ></FAQ>
           
        </div>
    );
};

export default Home;