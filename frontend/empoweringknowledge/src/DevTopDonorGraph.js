import React from 'react';
import * as d3 from 'd3';

const URL = 'https://www.congressfor.me/api/donors';

export default class BarGraph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stateReps: [],
      loaded: false
    };

    this.createBarGraph = this.createBarGraph.bind(this);
    this.fetchStateReps = this.fetchStateReps.bind(this);
  }

  componentDidMount() {
    this.fetchStateReps();
    if (this.state.loaded) {
      console.log("finished loading... component did mount");
      this.createBarGraph();
    }
  }

    /*
   * Builds the url that will be used to fetch the data.
   */
  buildUrl(){
      var url = "";
      
      var filter = ""
      
      // If there aren't any filters or terms for searching, use default url
      // that displays data in ascending order
      if(filter === ""){
          url = URL + '?q={'
          + '"}]}&page='
          + this.state.page;
      } 

      return url;
  }

  componentDidMount() {
    this.setState({isLoading: true});

    var url = this.buildUrl();
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({ items: data.objects, items: data.objects, 
                pages:data.total_pages,isLoading: false}, () => {
                if(this.state.pages <= 1)
                    this.setState({nextpage: 1})    
            });      
        })
        .catch(console.log);

}

  createBarGraph() {

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}> Top Democratic and Republican Donors </h1>
        <div>
            <script id="csv" type="text/csv">Name, Donation
Democratic, 0
Emilys List, 5719398
U. Cal., 5451214
Democracy Engine, 4404829
International Brotherhood of Electrical Workers, 4324886
Microsoft Corp., 4199167
AT&T Inc, 3678258
Sheet Metal- Air- Rail & Transportation Union, 3421581
American Federation of Teachers, 3188332
American Federation of State/Cnty/Munic Employees, 2853907
Comcast Corp, 2818949
Republican, 0
Koch Industries, 4340539
AT&T Inc, 3875432
Club for Growth, 3568331
Honeywell International, 3484877
Comcast Corp, 3141514
Northrop Grumman, 3105044
American Bankers Assn, 2844378
Lockheed Martin, 2836076
Majority Cmte PAC, 2809911
United Parcel Service, 2803108
    
</script>


var data = d3.csv.parse(d3.select('#csv').text());
var barLabel = function(state_data) { return state_data['Name']; };
var barValue = function(num_reps) { return num_reps['Donation']; };
 

var yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * 20]);
var y = function(d, i) { return yScale(i); };
var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
var x = d3.scale.linear().domain([0, d3.max(data, barValue)]).range([0, 420]);


var chart = d3.select('#chart').append("svg")
  .attr('width', 420 + 100 + 40)
  .attr('height', 18 + 3 + data.length * 20);

var gridContainer = chart.append('g')
  .attr('transform', 'translate(' + 100 + ',' + 18 + ')'); 
gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
  .attr("x", x)
  .attr("dy", -3)
  .attr("text-anchor", "middle")
  .text(String);

gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
  .attr("x1", x)
  .attr("x2", x)
  .attr("y1", 0)
  .attr("y2", yScale.rangeExtent()[1] + 3)
  .style("stroke", "#ccc");

var labelsContainer = chart.append('g')
  .attr('transform', 'translate(' + (100 - 5) + ',' + (18 + 3) + ')'); 
labelsContainer.selectAll('text').data(data).enter().append('text')
  .attr('y', yText)
  .attr('stroke', 'none')
  .attr('fill', 'black')
  .attr("dy", ".35em")
  .attr('text-anchor', 'end')
  .text(barLabel);

var barsContainer = chart.append('g')
  .attr('transform', 'translate(' + 100 + ',' + (18 + 3) + ')'); 
barsContainer.selectAll("rect").data(data).enter().append("rect")
  .attr('y', y)
  .attr('height', yScale.rangeBand())
  .attr('width', function(d) { return x(barValue(d)); })
  .attr('stroke', 'white')
  .attr('fill', 'steelblue');
  

barsContainer.selectAll("text").data(data).enter().append("text")
  .attr("x", function(d) { return x(barValue(d)); })
  .attr("y", yText)
  .attr("dx", 3) 
  .attr("dy", ".35em") 
  .attr("text-anchor", "start") 
  .attr("fill", "black")
  .attr("stroke", "none")
  .text(function(d) { return d3.round(barValue(d), 2); });

barsContainer.append("line")
  .attr("y1", -3)
  .attr("y2", yScale.rangeExtent()[1] + 3)
  .style("stroke", "#000");

        </div>

      </div>
    );
  }

