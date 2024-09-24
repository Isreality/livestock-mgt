import React from 'react';
import {ThreeDots} from 'react-loader-spinner';

const Preloader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ThreeDots
                type="ThreeDots"
                color="#00BFFF"
                height={80}
                width={80}
            />
        </div>
    );
};

export default Preloader;
