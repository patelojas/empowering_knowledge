import React from 'react';
import * as d3 from 'd3';

const POLIURL = "https://www.congressfor.me/api/";

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
</script>
    <script id="csv" type="text/csv">state,donations
Alabama,338130
Alaska,0
Arizona,612210
Arkansas,315050
California,4877649
Colorado,519858
Connecticut,504152
Delaware,114844
Florida,1253175
Georgia,996522
Hawaii,35400
Idaho,205302
Illinois,1527591
Indiana,544572
Iowa,588530
Kansas,410199
Kentucky,367036
Louisiana,319485
Maine,282857
Maryland,407575
Massachusetts,435895
Michigan,524355
Minnesota,379850
Mississippi,160400
Missouri,435144
Montana,107800
Nebraska,145453
Nevada,613219
New Hampshire,177027
New Jersey,939286
New Mexico,197405
New York,1649489
North Carolina,1169713
North Dakota,0
Ohio,922027
Oklahoma,184400
Oregon,261280
Pennsylvania,867282
Rhode Island,127700
South Carolina,246152
South Dakota,90744
Tennessee,382875
Texas,3149889
Utah,235400
Vermont,0
Virginia,752619
Washington,752824
West Virginia,280200
Wisconsin,299622
Wyoming,0</script>

var data = d3.csv.parse(d3.select('#csv').text());
var barLabel = function(state_data) { return state_data['state']; };
var barValue = function(donations) { return donations['donations']; };
 

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

