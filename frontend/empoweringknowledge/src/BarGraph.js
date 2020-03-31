import React from 'react';
import * as d3 from 'd3';

const POLIURL = 'https://api.empoweringknowledge.me/api/states';

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
          url = POLIURL + '?q={'
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
        <h1 style={{ textAlign: "center" }}> representatives per State </h1>
        <div>
            <script id="csv" type="text/csv">state,num_reps
      Alabama,24
Alaska,6
Arizona,29
Arkansas,18
California,140
Colorado,27
Connecticut,17
Delaware,8
Florida,97
Georgia,45
Hawaii,10
Idaho,12
Illinois,63
Indiana,38
Iowa,18
Kansas,22
Kentucky,22
Louisiana,30
Maine,13
Maryland,22
Massachusetts,28
Michigan,50
Minnesota,34
Mississippi,18
Missouri,29
Montana,10
Nebraska,17
Nevada,18
New Hampshire,15
New Jersey,40
New Mexico,15
New York,86
North Carolina,44
North Dakota,8
Ohio,54
Oklahoma,24
Oregon,17
Pennsylvania,71
Rhode Island,10
South Carolina,22
South Dakota,9
Tennessee,33
Texas,92
Utah,17
Vermont,4
Virginia,43
Washington,29
West Virginia,12
Wisconsin,27
Wyoming,8
</script>


var data = d3.csv.parse(d3.select('#csv').text());
var barLabel = function(state_data) { return state_data['state']; };
var barValue = function(num_reps) { return num_reps['num_reps']; };
 

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
