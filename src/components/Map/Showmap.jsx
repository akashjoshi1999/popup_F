import React from 'react'
import Ads from './Ads/Ads'
import './Show_map.css';

const Showmap = () => {
    return (
        <div className="container">
            <div className="show-map">
                <div className="topics">
                <h4> Trending Topics </h4>
                <p>  Select a state on the map to see what topic is trending most for that state. </p>
                </div>
                <div className="add">
                    <Ads />
                </div>
            </div>
        </div>
    )
}

export default Showmap
