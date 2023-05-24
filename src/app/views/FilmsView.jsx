import React from "react";
import Filter from "../components/layouts/Filter";
import FilmListView from "../components/layouts/FilmsListView";

const FilmsView = () =>{
 

    return(
        <div className="">
            <div className="z-10">
                <Filter />
            </div>
            <div className="pt-5 "></div>
            <FilmListView/>
        </div>


        
    );


};

export default FilmsView