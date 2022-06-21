import { useEffect, useRef } from "react";
import { select, axisBottom, scaleLinear, axisRight, scaleBand } from "d3";
import useResizeObserver from "../hooks/useResizeObserver";
import { arc } from "d3";

export default function BarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    // svg = w 300 * h 150;
    const svg = select(svgRef.current);

    // const arc1 = arc()
    //   .innerRadius(30)
    //   .outerRadius(40)
    //   .padRadius(10)
    //   .startAngle(10)
    //   .endAngle(15);
    // svg.append('path').attr('d', arc1).attr('fill', 'red');

    if (!dimensions) return;
    // bar chart
    const xScale = scaleBand()
      .domain(data.map((value, index) => index + 1))
      .range([0, dimensions.width]) // dimensions와 연동
      .padding(0.5);

    const xAxis = axisBottom(xScale).ticks(data.length);

    const yScale = scaleLinear().domain([0, 200]).range([dimensions.height, 0]); // dimensions와 연동

    const yAxis = axisRight(yScale);

    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${dimensions.width}px)`)
      .call(yAxis);

    const colorScale = scaleLinear()
      .domain([75, 100, 150, 200])
      .range(["#515ada", "#503396", "#efd5ff"])
      .clamp(true);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1")
      .attr("x", (value, index) => xScale(index + 1))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (e, value) => {
        // d3 v6부터는 e를 명시하지 않고 value, index만 작성하면 value가 데이터값이 아니라 [object MouseEvent]로 출력된다
        // 또한 index는 아래와 같이 별도로 정의해주어야 사용 가능하다
        // https://observablehq.com/@d3/d3v6-migration-guide#events 에서 자세한 사항을 볼 수 있음
        const index = svg.selectAll(".bar").nodes().indexOf(e.target);
        svg
          .selectAll(".tooltip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(value) - 8))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index + 1) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => dimensions.height - yScale(value));
  }, [data, dimensions]);

  return (
    // responsive 적용을 위해 svg 컴포넌트를 div로 감싸주기
    <div ref={wrapperRef} className="svg-wrapper">
      <svg ref={svgRef}>
        {/* <path d="M10 10 H 90 V 90 H 10" stroke='black'/> */}
        {/* <path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
        <path d="M70 10 C 70 20, 120 20, 120 10" stroke="black" fill="transparent"/>
        <path d="M130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent"/>
        <path d="M10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent"/>
        <path d="M70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent"/>
        <path d="M130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent"/>
        <path d="M10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent"/>
        <path d="M70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent"/>
        <path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/> */}
        {/* <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/> */}
        {/* <path d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/> */}
        {/* <path d="M10 315
           L 110 215
           A 30 50 0 0 1 162.55 162.45
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/> */}
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}
