import React, {Component} from 'react';
import * as d3 from "d3";

class PieChart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        democrat: 0,
        republican: 0,
        other: 0
        }
    }


    componentDidMount() {
        var value = window.location.href.split("/")
        var path = (value[4])
        var page = 1;
        for(var i = 1; i < 173; i++){
            fetch('https://api.empoweringknowledge.me/api/congressmembers?page=' + page)
            .then(res => res.json())
            .then((data) => {
                for(var d of data.objects){
                    if(d.party == "D"){
                        this.setState({ democrat: this.state.democrat += Object.keys(d.bills_sponsored).length}); 
                       
                    }
                    else if(d.party == "R"){
                        this.setState({ republican: this.state.republican += Object.keys(d.bills_sponsored).length}); 
                    }
                    else {
                        this.setState({ other: this.state.other += Object.keys(d.bills_sponsored).length}); 
                    }
                   
                }
            }, this.finish())
            
        }
        
        
    }

    finish(){    
        console.log("done")
        return
    }

  

    render() {
        
        // Create dummy data
        var data = {Republican: this.state.republican, Democrat: this.state.democrat,}

        console.log(data)
        // set the dimensions and margins of the graph
        var width = 450
        var height = 450
        var margin = 40

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2

        // append the svg object to the div called 'my_dataviz'
        var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        // set the color scale
        var color = d3.scaleOrdinal()
        .domain(data)
        .range(["#ff0000","#0000ff" ])

         // shape helper to build arcs:
        var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)



        // Compute the position of each group on the pie:
        var pie = d3.pie()
        .value(function(d) {return d.value; })
        var data_ready = pie(d3.entries(data))

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

            svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function (d) { return d.data.key })
        .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .style("font-size", 25)
    



        return (
            <div>
                <h2 style={{paddingTop: "2%"}}>Total Number of Energy Bills by Party</h2>
                <div style={{ paddingLeft: "35%", justifyContent: "center" }}>
                    <svg id='my_dataviz' width="100%" height={650}></svg>
                </div>
            </div>

        );

    }
}

export default PieChart;
