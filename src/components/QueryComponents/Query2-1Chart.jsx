import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Query2Chart = () => {
  const chartRef = useRef();
  const [data, setData] = useState([]);
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear()); // Default to current year, adjust as needed

  useEffect(() => {
    // Fetch the urban vs rural observations data
    fetch(`/api/urbanRuralObservations?year=${yearFilter}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [yearFilter]);

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(chartRef.current);
      const width = +svg.style('width').replace('px', '');
      const height = +svg.style('height').replace('px', '');

      // Assuming the data contains latitude and longitude, we need to project these points onto the SVG canvas
      // This projection could be adjusted based on your specific geographic focus area
      const projection = d3
        .geoMercator()
        .center([13.4, 47.6]) // Roughly center the map on Austria
        .translate([width / 2, height / 2])
        .scale(5500);

      // Define a scale for the bubble sizes
      const size = d3
        .scaleSqrt()
        .domain([0, d3.max(data, (d) => d.speciesCount)])
        .range([0, 20]); // Adjust range based on your visual preference

      // Clean previous bubbles before drawing new ones
      svg.selectAll('circle').remove();

      // Draw bubbles
      svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d) => projection([d.longitude, d.latitude])[0])
        .attr('cy', (d) => projection([d.longitude, d.latitude])[1])
        .attr('r', (d) => size(d.speciesCount))
        .style('fill', (d) =>
          d.locationType === 'Urban' ? '#FF4136' : '#0074D9'
        )
        .style('opacity', 0.75);

      // Here, you would add interactive features, like tooltips or click events for more details
    }
  }, [data]);

  return (
    <div>
      {/* Placeholder for slider component */}
      <div className="my-4">
        <input
          type="range"
          min="2000"
          max="2020"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="w-full"
        />
        <div>Year: {yearFilter}</div>
      </div>
      <svg ref={chartRef} width="960" height="500" className="m-auto"></svg>
    </div>
  );
};

export default Query2Chart;
