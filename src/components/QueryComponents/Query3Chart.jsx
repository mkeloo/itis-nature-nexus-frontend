import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Query5Chart = () => {
  const chartRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint for Query 3
    fetch('/api/query3') // Update with the correct endpoint for Query 3
      .then((response) => response.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(chartRef.current);
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = +svg.attr('width') - margin.left - margin.right;
      const height = +svg.attr('height') - margin.top - margin.bottom;

      // Scales
      const x = d3.scaleBand()
        .domain(data.map(d => d.year))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([
          0,
          d3.max(data, d => d.growth_rate_percentage)
        ])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Axes
      svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y));

      // Bars for growth rate percentage
      svg.selectAll('.growthRateBar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'growthRateBar')
        .attr('x', d => x(d.year))
        .attr('y', d => y(d.growth_rate_percentage))
        .attr('width', x.bandwidth())
        .attr('height', d => height - margin.bottom - y(d.growth_rate_percentage))
        .attr('fill', 'steelblue');

      // Optional: Add legend, tooltips, etc.
    }
  }, [data]);

  return <svg ref={chartRef} width="800" height="400"></svg>;
};

export default Query3Chart;
