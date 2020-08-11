/**
 * Function that draws the tree
 * Based on Robert Gravelle's post https://www.developer.com/lang/jscript/creating-a-tree-diagram-with-d3.js.html
 */

function drawTree(treeData, svg) {
    // Remove the old group element in the SVG to make it blank
    svg.selectAll("*").remove();

    // If treeData is not null, draw the tree
    if (treeData) {
         // Get the side board element and set the height of the SVG
         const side_board = document.getElementById("side_board");
         const height = document.getElementById('tree_depth_dropdown').value * 100;

        // Assign the data to a hierarchy using parent-child relationships
        let nodes = d3.hierarchy(treeData, d => d[2]);

        // Compute the width of SVG based on the number of leaves
        num_leaves = nodes.leaves().length;
        width = num_leaves * 50;

        // Generate the tree
        const tree = d3.tree();
        tree.size([width, height]);
        nodes = tree(nodes);

svg.style("height", height)
                .style("width", width);



        // Set the color and append the main group element
        g = svg.attr("fill", "red")
               .append("g")
            // .attr("stroke", "red")
            // .attr("viewBox", [0, 0, width, height])

        // Define the zoom function and call it once to center the main group element 
        // https://stackoverflow.com/questions/57119405/how-can-i-offset-the-initial-starting-position-of-a-d3-zoom
        div_width = document.getElementById('tree_div').offsetWidth; // width of the enclosing div

        zoom = d3.zoom()
            .scaleExtent([0.35, 5])
            .on("zoom", function () {
            g.attr("transform", d3.event.transform)
        });

        svg.call(zoom.transform, d3.zoomIdentity.scale(1).translate(((div_width - width) / 2), 30));

        // Define the zoom call function for the SVG
        svg.call(zoom);

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


        // add the minimax score to the node
        node.append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.data[1]);
    }
}