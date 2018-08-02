//set the SVG depending on the display size
function getSvg(){
    var desk = window.innerWidth > window.innerHeight;
    var vg = desk ? '-01' : '-02';
    container.innerHTML = `<object data="svgs/witz${vg}.svg"/>`;
    setTimeout(getObj,1000);
    setTimeout(function(){main(desk);},1001);
}

//define obj and svg vars
function getObj(){        
    obj = container.getElementsByTagName('object')[0].contentDocument;
    svg = obj.getElementsByTagName('svg')[0];
    d3svg = d3.select(svg);
}
var fbLink = "https://www.facebook.com/witzhummus";
var igLink = "https://www.instagram.com/witzhummus/";
var pressLink = "http://www.findingberlin.com/hummus-witz-is-not-a-joke/";

//yikes
function createLinks(links) {
    console.log(links);
    for (var i = 0; i < links.length ; i++) {
        var cLink = links[i];
        cLink.style.cursor = 'pointer';
        if (cLink.id.indexOf("link-facebook") >= 0) {
            cLink.addEventListener("click", function(cLink){window.open(fbLink)})
            cLink.addEventListener("mouseover", function(cLink){
                d3svg.selectAll('#facebook *').attr('fill', 'blue');
                d3svg.selectAll('#facebook *').attr('stroke', '#f05022');
            });
            //there is some serious jank in here
            cLink.addEventListener("mouseout", function(cLink){
                d3svg.selectAll('#facebook *').attr('fill', 'none');
                d3svg.selectAll('#facebook *').attr('stroke', 'white');
                cLink.target.style.fill = 'white';
            });
        }
        if (cLink.id.indexOf("link-instagram")>= 0) {
            cLink.addEventListener("click", function(){window.open(igLink)})
            cLink.addEventListener("mouseover", function(){
                d3svg.selectAll('#instagram *').attr('fill', 'blue');
                d3svg.selectAll('#instagram *').attr('stroke', '#f05022');
            });
            cLink.addEventListener("mouseout", function(cLink){
                d3svg.selectAll('#instagram *').attr('fill', 'none');
                d3svg.selectAll('#instagram *').attr('stroke', 'white');
                cLink.target.style.fill = 'white';
            });
        }
        if (cLink.id.indexOf("link-location")>=0){
            cLink.addEventListener("click", generateMap)

            cLink.addEventListener("mouseover", function(){
                d3svg.selectAll('#location *').attr('fill', 'blue');
                d3svg.selectAll('#location *').attr('stroke', '#f05022');
            });
            cLink.addEventListener("mouseout", function(){
                d3svg.selectAll('#location *').attr('fill', 'none');
                d3svg.selectAll('#location *').attr('stroke', 'white');
            })
        }
        if (cLink.id.indexOf("link-press")>=0){
            cLink.addEventListener("click", function(){window.open(pressLink)})
            cLink.addEventListener("mouseover", function(){
                d3svg.selectAll('#press *').attr('fill', '#f05022');
                d3svg.selectAll('#press *').attr('stroke', 'blue');
            });
            cLink.addEventListener("mouseout", function(){
                d3svg.selectAll('#press *').attr('fill', 'none');
                d3svg.selectAll('#press *').attr('stroke', 'white');
            });
        }
    }
}

function colorizer() {
    var fucker = 20*Math.sin((2*Math.PI/10000)*counter+Math.PI/2.5);
    var witzPaths = svg.querySelector("[id^='witz']").querySelectorAll("path");
    var polyLines = svg.querySelectorAll("polyline");
    if (counter % 3 ===0 && fucker > 19.95){
        for (i=0;i<witzPaths.length;i++){
            var one = Math.abs(Math.sin(counter))*255+randInt(10000);
            var two = Math.abs(Math.sin(counter))*255+randInt(1000);
            var three = Math.abs(Math.sin(counter))*randInt(1000);
            witzPaths[i].setAttribute("fill", `rgb(${one},${two},${three})`);
            witzPaths[i].setAttribute("opacity", Math.sin(counter));
            if (polyLines[i]){
                polyLines[i].setAttribute("fill", `rgb(${one},${two},${three})`);
                polyLines[i].setAttribute("opacity", 200*Math.sin(counter));
            }
        }
    } else if (fucker < 19 && fucker > 18.8) {
        for (i=0;i<witzPaths.length;i++){
            witzPaths[i].setAttribute("fill", `white`);
            witzPaths[i].setAttribute("opacity", 1);
            if (polyLines[i]){
                polyLines[i].setAttribute("fill", `white`);
                polyLines[i].setAttribute("opacity", 1);
            }
        }
    }
    counter += 1;
    
}
function lineMover (){
    console.log("move it");
        //get all lines
        var lines = svg.querySelectorAll("[id^='s']");
        //grab random line
        var randLine = lines[randInt(lines.length)];
        //get its points as a string
        var pointsAttr = d3.select(randLine).attr('points');
        //turn string into array and get rid of blanks
        var linePoints = pointsAttr.split(' ').filter(function(n){ return n != "" });
        //define a random index of the array
        var randPointIndex = randInt(linePoints.length);
        //grab the index and turn it into an array
        var randPoint = linePoints[randPointIndex].split(',');
        //define new x and y values with a random sum
        var pX = parseFloat(randPoint[0])+ randInt(20);
        var pY = parseFloat(randPoint[1])+ randInt(10);
        //pass new points into the array
        linePoints[randPointIndex] = [pX,pY];
        //create the new line string
        var newLine = linePoints.join(' ');
        //transition between the new line and back to the old one and then loop forever
        var dur = 200;
        d3.select(randLine).transition()
            .duration(dur)
            .attr('points',newLine)
            .on('end', function(){
                    d3.select(this).transition().duration(dur).attr('points', pointsAttr)
                    .on('end', function(){
                    lineMover();
                });
            })
}