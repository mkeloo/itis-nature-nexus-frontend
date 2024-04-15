import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ConservationImpactPage5 = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const drawChart = async () => {
      // Fetch the data from the API
      const response = await axios.get('http://localhost:3000/api/query5');
      const data = response.data;

      // Set dimensions and margins of the graph
      const margin = { top: 20, right: 30, bottom: 40, left: 90 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Process data for stacking
      const processedData = data.map((d) => ({
        stateProvince: d.STATEPROVINCE,
        genusData: [{ genus: d.GENUS, value: d.NUMBEROFSPECIES }],
      }));

      // Group data by stateProvince
      const groupedData = d3
        .groups(processedData, (d) => d.stateProvince)
        .map(([key, value]) => ({
          stateProvince: key,
          genusData: value.flatMap((v) => v.genusData),
        }));

      // Stack the data
      const stack = d3
        .stack()
        .keys(groupedData.flatMap((g) => g.genusData.map((d) => d.genus)))
        .value(
          (d, key) => d.genusData.find((g) => g.genus === key)?.value || 0
        );

      const stackedData = stack(groupedData);

      // Set scales
      const x = d3
        .scaleBand()
        .domain(groupedData.map((d) => d.stateProvince))
        .rangeRound([0, width])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(stackedData, (d) => d3.max(d, (d) => d[1]))])
        .range([height, 0]);

      // Create groups for each series, rects for each segment
      svg
        .append('g')
        .selectAll('g')
        .data(stackedData)
        .enter()
        .append('g')
        .attr('fill', (d, i) => d3.schemeCategory10[i])
        .selectAll('rect')
        .data((d) => d)
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.data.stateProvince))
        .attr('y', (d) => y(d[1]))
        .attr('height', (d) => y(d[0]) - y(d[1]))
        .attr('width', x.bandwidth());

      // Add axes
      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g').call(d3.axisLeft(y));

      // Add x-axis label
      svg
        .append('text')
        .attr('text-anchor', 'end')
        .attr('x', width / 2 + margin.left)
        .attr('y', height + margin.top + 20)
        .text('Regions');

      // Add y-axis label
      svg
        .append('text')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 20)
        .attr('x', -margin.top - height / 2 + 20)
        .text('Number of Species');
    };

    drawChart();
  }, []);

  return (
    <div>
      <h1>Conservation Impact Visualization for Austria</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ConservationImpactPage5;
