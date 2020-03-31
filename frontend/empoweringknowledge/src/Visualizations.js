import React, {Component} from "react";
import PieChart from './PieChart.js';
import Graph from './bar_chart.jpg';
import ScatterPlot from './ScatterPlot.jpg';
import Donate from './donations_chart.jpg';
import TopDonor from './DonationsBarChart.jpg';
import CRM_BarChart from './CFM_BarChart.jpg';

export class Visualizations extends Component {

    render(){
        
        return(
            <div>
                <PieChart />
                <h2>Number of Representatives Per State</h2>
                <img style={{paddingTop: "2%"}} src= {Graph}></img>
                <h2>Median Household Income vs. Population</h2>
                <img style={{paddingTop: "2%"}} src={ScatterPlot}></img>
                <h2>Donations Per State</h2>
                <img style={{paddingTop: "2%"}} src= {Donate}></img>
                <h2>Top Democratic and Republican Donors</h2>
                <img style={{paddingTop: "2%"}} src= {TopDonor}></img>
                <h2>Top Donation Recipients</h2>
                <img style={{paddingTop: "2%"}} src= {CRM_BarChart}></img>
            </div>
        );
    }
    
}

export default Visualizations;
