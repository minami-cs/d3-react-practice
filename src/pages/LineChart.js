import { useEffect, useRef } from 'react';
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  axisRight,
} from 'd3';

export default function LineChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    // svg = w 300 * h 150;
    const svg = select(svgRef.current);

    // line chart
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);

    xAxis(svg.select('.x-axis'));

    const yAxis = axisRight(yScale);

    yAxis(svg.select('.y-axis'));

    svg.select('.x-axis').style('transform', 'translateY(150px)').call(xAxis);
    svg.select('.y-axis').style('transform', 'translateX(300px)').call(yAxis);

    // path의 d값 생성 + curve 속성 추가
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    // path로 라인 그리기
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue');

    // 원형 그리기
    // svg
    //   .selectAll('circle')
    //   .data(data)
    //   .join(
    //     'circle'
    //     // exit()는 d3에서 기본값으로 동작하므로 굳이 명시하여 작성하지 않아도 된다.
    //     // enter와 update에서도 attr로 class를 더해주는 것만 하고 있기 때문에 굳이 작성하지 않아도 된다.
    //     // (enter) => enter.append('circle').attr('class', 'new'),
    //     // (update) => update.attr('class', 'updated'),
    //     // (exit) => exit.remove()
    //   )
    //   .attr('r', (value) => value)
    //   .attr('cx', (value) => value * 2)
    //   .attr('cy', (value) => value * 2)
    //   .attr('stroke', 'red');
  }, [data]);

  return (
    <svg ref={svgRef}>
      {/* <path d="M0, 150 100, 100 150, 120" stroke="blue" fill="none" /> */}
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}
