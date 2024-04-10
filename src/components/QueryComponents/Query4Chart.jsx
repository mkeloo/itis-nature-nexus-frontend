import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Query4Chart = () => {
  const chartRef = useRef();
  const [data, setData] = useState([]);
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('');

  // Fetch the initial data and species list
  useEffect(() => {
    fetch('/api/longTermTrends')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setSpecies([...new Set(data.map((d) => d.species))]);
        setSelectedSpecies(data[0]?.species); // Default to the first species
      });
  }, []);

  // Update the chart when data or selectedSpecies changes
  useEffect(() => {
    if (data.length > 0 && selectedSpecies) {
      const svg = d3.select(chartRef.current);
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = +svg.attr('width') - margin.left - margin.right;
      const height = +svg.attr('height') - margin.top - margin.bottom;

      // Filter data for the selected species
      const filteredData = data.filter((d) => d.species === selectedSpecies);

      const x = d3
        .scaleLinear()
        .domain(d3.extent(filteredData, (d) => d.year))
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(filteredData, (d) => d.observationCount)])
        .range([height - margin.bottom, margin.top]);

      // Clear previous paths
      svg.selectAll('*').remove();

      // Draw the x-axis
      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(d3.format('d')));

      // Draw the y-axis
      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // Draw the line
      svg
        .append('path')
        .datum(filteredData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          d3
            .line()
            .x((d) => x(d.year))
            .y((d) => y(d.observationCount))
        );
    }
  }, [data, selectedSpecies]);

  return (
    <div>
      <label htmlFor="speciesSelector">Select Species:</label>
      <select
        id="speciesSelector"
        value={selectedSpecies}
        onChange={(e) => setSelectedSpecies(e.target.value)}
      >
        {species.map((species) => (
          <option key={species} value={species}>
            {species}
          </option>
        ))}
      </select>
      <svg ref={chartRef} width="600" height="400"></svg>
    </div>
  );
};
export default Query4Chart;
