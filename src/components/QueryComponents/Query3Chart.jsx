import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Query3Chart = () => {
  const chartRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/seasonalEndangeredObservations')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(chartRef.current);
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = svg.attr('width') - margin.left - margin.right;
      const height = svg.attr('height') - margin.top - margin.bottom;

      // Transform data for stacked area chart
      const species = [...new Set(data.map((d) => d.species))];
      const seasons = [...new Set(data.map((d) => `${d.year}-${d.season}`))];

      const stackData = species.map((species) => {
        return seasons.map((season) => {
          const d = data.find(
            (d) => `${d.year}-${d.season}` === season && d.species === species
          );
          return { x: season, y: d ? d.observationCount : 0 };
        });
      });

      const stack = d3.stack().keys(species)(
        d3.transpose(stackData).map((d) => {
          let obj = {};
          d.forEach((item, i) => (obj[species[i]] = item.y));
          return obj;
        })
      );

      const x = d3
        .scaleBand()
        .domain(seasons)
        .range([margin.left, width - margin.right]);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(stack, (d) => d3.max(d, (d) => d[1]))])
        .range([height - margin.bottom, margin.top]);
      const color = d3.scaleOrdinal(d3.schemeCategory10).domain(species);

      svg
        .selectAll('path')
        .data(stack)
        .enter()
        .append('path')
        .attr('fill', ({ key }) => color(key))
        .attr(
          'd',
          d3
            .area()
            .x((d, i) => x(seasons[i]))
            .y0((d) => y(d[0]))
            .y1((d) => y(d[1]))
            .curve(d3.curveMonotoneX)
        );

      // Add Axes
      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // Optional: Add legend, axis labels, etc.
    }
  }, [data]);

  return <svg ref={chartRef} width="960" height="500"></svg>;
};
export default Query3Chart;
