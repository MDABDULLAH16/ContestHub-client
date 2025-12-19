import React from 'react';
import Banner from './Banner/Banner';
import Loader from '../../components/Loader/Loader';
import PopularContests from './PopularContests/PopularContests';
import WinnerSection from './WinnerAdvertisement/WinnerAdvertisement';

const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularContests></PopularContests>
           <WinnerSection></WinnerSection>
           
        </div>
    );
};

export default Home;