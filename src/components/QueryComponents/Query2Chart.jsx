import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Query2Chart = () => {
  const chartRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the urban vs rural diversity data
    fetch('/api/urbanRuralDiversity')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(chartRef.current);
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width =
        +svg.style('width').replace('px', '') - margin.left - margin.right;
      const height =
        +svg.style('height').replace('px', '') - margin.top - margin.bottom;
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);

      const x1 = d3.scaleBand().padding(0.05);

      const y = d3.scaleLinear().rangeRound([height, 0]);

      const z = d3.scaleOrdinal().range(['#98abc5', '#8a89a6']);

      const keys = ['urbanSpeciesCount', 'ruralSpeciesCount'];

      x0.domain(data.map((d) => d.year));
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);
      y.domain([
        0,
        d3.max(data, (d) => Math.max(d.urbanSpeciesCount, d.ruralSpeciesCount)),
      ]).nice();

      g.append('g')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d) => `translate(${x0(d.year)},0)`)
        .selectAll('rect')
        .data((d) => keys.map((key) => ({ key, value: d[key] })))
        .enter()
        .append('rect')
        .attr('x', (d) => x1(d.key))
        .attr('y', (d) => y(d.value))
        .attr('width', x1.bandwidth())
        .attr('height', (d) => height - y(d.value))
        .attr('fill', (d) => z(d.key));

      g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x0));

      g.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y).ticks(null, 's'))
        .append('text')
        .attr('x', 2)
        .attr('y', y(y.ticks().pop()) + 0.5)
        .attr('dy', '0.32em')
        .attr('fill', '#000')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start')
        .text('Species Count');

      // Legend setup here
    }
  }, [data]);

  return <svg ref={chartRef} width="960" height="500" className="m-auto"></svg>;
};
export default Query2Chart;
