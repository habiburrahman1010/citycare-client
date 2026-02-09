import React from 'react';
import Banner from '../Shared/Banner/Banner';
import LatestResolvedIssues from '../Shared/Letest Resolved/LatestResolvedIssues';
import FeaturesSection from '../Shared/Features/FeaturesSection';
import HowItWorks from '../Shared/How Works/HowItWorks';
import CommunityImpact from '../Shared/CommunityImpect/CommunityImpect';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestResolvedIssues></LatestResolvedIssues>
            <FeaturesSection></FeaturesSection>
            <HowItWorks></HowItWorks>
            <CommunityImpact></CommunityImpact>
            
        </div>
    );
};

export default Home;