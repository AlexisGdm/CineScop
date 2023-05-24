import React from "react";
import Filter from "../components/layouts/Filter";
import SeriesListView from "../components/layouts/SeriesListView";


const SeriesView = () =>{


    return(
        <div className="">
            <div className="z-10">
                <Filter />
            </div>
            <div className="pt-5 "></div>
            <SeriesListView/>
        </div>


        
    );


};

export default SeriesView