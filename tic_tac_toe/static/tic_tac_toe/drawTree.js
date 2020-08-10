// Update some attributes of the SVG and add zoom
const margin = {
        top: 50,
        right: 90,
        bottom: 30,
        left: 50
    };

height = 400 - margin.left - margin.right;
width = 2000 - margin.top - margin.bottom;

svg.attr("fill", "red")
    // .attr("stroke", "red")
    .attr("viewBox", [0, 0, width, height])
    .call(d3.zoom()
        // .extent([[0, 0], [width, height]])
        .scaleExtent([0.1, 10])
        .on("zoom", function () {
        g.attr("transform", d3.event.transform)
     }));


//Function that draws the tree
function drawTree(treeData, svg) {
    
    // Get the side board element
    const side_board = document.getElementById("side_board");

    // Remove the old group element in the SVG and add a new one
    svg.selectAll("*").remove();
    g = svg.append("g")
        // .attr("transform",
        //     "translate(" + 0 + "," + 0 + ")");
        // .attr("style",
        //     "translate(0%, 50%)");
        // .attr("transform","translate(30,100)scale(3,3)");

    // If treeData is not null, draw the tree
    if (treeData) {


        // declares a tree layout and assigns the size
        const tree = d3.tree();

        //  assigns the data to a hierarchy using parent-child relationships
        // let nodes = d3.hierarchy(treeData, d => d.children);
        let nodes = d3.hierarchy(treeData, d => d[2]);

        // Compute the width of SVG based on the number of leaves
        num_leaves = nodes.leaves().length;
        width = num_leaves * 50;
        tree.size([width, height]);

        // maps the node data to the tree layout
        nodes = tree(nodes);


        // adds the links between the nodes
        const link = g.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .style("stroke", "grey")
            .style("stroke-width", 1)
            .style("fill", "none")
            .attr("d", d => {

                // Bezier curves
                // return `M${d.x},${d.y}
                //         C${(d.x + d.parent.x) / 2},${d.y}
                //         ${(d.x + d.parent.x) / 2}, ${d.parent.y}
                //         ${d.parent.x},${d.parent.y}`;

                // Straight lines
                 return `M${d.x},${d.y}
                        L${d.parent.x},${d.parent.y}`;
           });

        // adds each node as a group
        const node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

        // adds the circle to the node
        node.append("circle")
            // .attr("r", d => d.data.value)
            // .style("stroke", d => d.data.type)
            // .style("fill", d => d.data.level);
            .attr("r", 20)
            .style("stroke", 9)
            .style("fill", "lightblue")

            // Hover effects
            .on('mouseover', function (d) {
                d3.select(this).transition()
                                .duration('50')
                                .attr('opacity', '.9');
                // arrayToBoard(side_board, d3.select(this).data()[0].data[0]);
                arrayToBoard(side_board, d.data[0]);
            })
            
            .on('mouseout', function () {
                d3.select(this).transition()
                                .duration('50')
                                .attr('opacity', '1');
                setDefaultBoard(side_board);
            })

            .on('click', function (d) {
                // @TODO - implement game logic
                // arrayToBoard(main_board, d.data[0]);
            });


        // adds the text to the node
        node.append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.data[1]);
    }
}