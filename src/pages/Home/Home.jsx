import React from 'react';
import Banner from './Banner/Banner';
import Loader from '../../components/Loader/Loader';

const Home = () => {
    return (
        <div>
            <Banner/>
            <h1>this is home</h1>
            <Loader/>
           
        </div>
    );
};

export default Home;