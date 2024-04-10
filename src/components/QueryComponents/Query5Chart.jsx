import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Query5Chart = () => {
  const chartRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/conservationImpact')
      .then((response) => response.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(chartRef.current);
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = +svg.attr('width') - margin.left - margin.right;
      const height = +svg.attr('height') - margin.top - margin.bottom;

      // Transform data
      const nestedData = d3
        .nest()
        .key((d) => d.year)
        .entries(data);

      // Scales
      const x = d3
        .scaleBand()
        .domain(nestedData.map((d) => d.key))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, (d) =>
            Math.max(d.uniqueSpeciesCount, d.observationCount)
          ),
        ])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Axes
      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // Bars for unique species count
      svg
        .selectAll('.speciesBar')
        .data(data.filter((d) => d.conservationStatus === 'Inside'))
        .enter()
        .append('rect')
        .attr('class', 'speciesBar')
        .attr('x', (d) => x(d.year))
        .attr('y', (d) => y(d.uniqueSpeciesCount))
        .attr('width', x.bandwidth() / 2)
        .attr('height', (d) => height - margin.bottom - y(d.uniqueSpeciesCount))
        .attr('fill', '#4C9A2A');

      // Bars for observation count
      svg
        .selectAll('.observationBar')
        .data(data.filter((d) => d.conservationStatus === 'Outside'))
        .enter()
        .append('rect')
        .attr('class', 'observationBar')
        .attr('x', (d) => x(d.year) + x.bandwidth() / 2)
        .attr('y', (d) => y(d.observationCount))
        .attr('width', x.bandwidth() / 2)
        .attr('height', (d) => height - margin.bottom - y(d.observationCount))
        .attr('fill', '#FF4136');

      // Optional: Add legend, tooltips, etc.
    }
  }, [data]);

  return <svg ref={chartRef} width="800" height="400"></svg>;
};

export default Query5Chart;
