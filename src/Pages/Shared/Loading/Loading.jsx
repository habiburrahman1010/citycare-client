import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Whistle_Loding.json";


const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-40">
                <Lottie animationData={loadingAnimation} loop={true} />
            </div>
        </div>
    );
};

export default Loading;
