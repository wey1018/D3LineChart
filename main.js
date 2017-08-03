(function (window, document) {
    const width = 880;
    const height = 420;
    const margin = {
        top: 40,
        left: 40,
        bottom: 40,
        right: 40
    };

    let svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    let path = svg.append("path")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    let x = d3.scaleLinear()
        .range([0, width]);

    let y = d3.scaleLinear()
        .range([height, 0]);

    let line = d3.line()
        .defined(d => d)
        .x(d => x(d.x))
        .y(d => y(d.y));

    let yAxis = svg.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    let xAxis = svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(${margin.left}, ${margin.top + height})`);

    let dot = svg.selectAll(".dot")
        .data(d3.range(40).map(i => {
            return {
                x: i / 39,
                y: 0
            };
        }))
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("r", 10);

    let button = document.querySelector('button');
    button.addEventListener('click', e => {

        let data = d3.range(40).map(i => {
            return {
                x: i / 39,
                y: d3.randomUniform(i - 5, i + 5)()
            };
        });

        x.domain(d3.extent(data, data => data.x));
        y.domain(d3.extent(data, data => data.y));

        let dot = svg.selectAll(".dot")
            .data(data)
            .transition()
            .attr("class", "dot")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", 3.5);

        yAxis.call(d3.axisLeft(y));
        xAxis.call(d3.axisBottom(x));

        path.datum(data)
            .transition()
            .attr("class", "line")
            .attr("d", line);
    });

    button.click();
})(window, document)