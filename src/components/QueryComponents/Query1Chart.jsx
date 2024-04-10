import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Query1Chart = () => {
  const d3Chart = useRef();
  const [data, setData] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    fetch('/api/climateBirdCorrelation')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // D3.js chart setup
  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(d3Chart.current);
      const margin = { top: 20, right: 30, bottom: 40, left: 90 };
      const width = parseInt(svg.style('width')) - margin.left - margin.right;
      const height = parseInt(svg.style('height')) - margin.top - margin.bottom;
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Scales
      const x = d3.scaleTime().rangeRound([0, width]);
      const y0 = d3.scaleLinear().rangeRound([height, 0]);
      const y1 = d3.scaleLinear().rangeRound([height, 0]);

      // Data manipulation
      const observations = data.map((d) => ({
        date: new Date(d.year, d.month - 1),
        count: d.speciesObservationCount,
      }));
      const temperatures = data.map((d) => ({
        date: new Date(d.year, d.month - 1),
        temp: d.avgTemperature,
      }));
      const precipitation = data.map((d) => ({
        date: new Date(d.year, d.month - 1),
        precip: d.avgPrecipitation,
      }));

      x.domain(d3.extent(data, (d) => new Date(d.year, d.month - 1)));
      y0.domain([0, d3.max(observations, (d) => d.count)]);
      y1.domain([0, d3.max(temperatures, (d) => d.temp)]);

      // Axes
      g.append('g')
        .call(d3.axisLeft(y0))
        .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Observation Count');

      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Observation Count Line
      g.append('path')
        .datum(observations)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          d3
            .line()
            .x((d) => x(d.date))
            .y((d) => y0(d.count))
        );

      // Temperature Line (Consider using a secondary axis for precipitation or temp)
      g.append('path')
        .datum(temperatures)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          d3
            .line()
            .x((d) => x(d.date))
            .y((d) => y1(d.temp))
        );

      // Add more elements like axes titles, additional lines, etc.
    }
  }, [data]);

  return (
    <div className="flex justify-center p-4">
      <svg className="w-full h-96" ref={d3Chart}></svg>
    </div>
  );
};

export default Query1Chart;
