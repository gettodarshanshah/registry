import React from "react";
import Table from "./Table"
class AppView extends React.Component{
    
    constructor(props){
        super(props)
    }
    pathArray = window.location.pathname.split("/");
    applicationName =  this.pathArray[2];

    render()
    {
        return(
            <div>
               <Table
               applicationName = {this.applicationName}
               />
               
            </div>
        );
    }
}
export default AppView;