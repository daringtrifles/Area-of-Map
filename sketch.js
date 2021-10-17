let img;
linex = [];
liney = [];
let input, button, length;
length = 0;
distance = 0;
var checked = 0;
var checkbox;
var val=100;
var slider;
let x_vals = [];
let y_vals = [];
var SumOfAllX_Values = 0;
var SumOfAllY_Values = 0;
var averagexpoint;
var averageypoint;
let listofallangles = [];
var slope;
var area;
var areaNotYetMultipliedByHalf = 0;
var allareas = []
var showarea=0;

function preload() {
  img = loadImage('map.png');
}

function setup() {
  createCanvas(img.width, img.height);



    input = createInput();
  input.position(20, img.height+165);
  button = createButton('submit');
  button.position(input.x + input.width, img.height+165);
  button.mousePressed(lengthfix);
  greeting = createElement('h4', 'Length');
  greeting.position(20, img.height+125);


    background(220);
  image(img, 0, 0);
  loadPixels();
}
function lengthfix() {
  length = input.value();

  area_();
}
function mouseClicked() {

  linex.push(mouseX);
  liney.push(mouseY);


}


function draw() {
  val = 1
  for (i = 0; i < 2; i++) {
    ellipse(linex[i], liney[i], 5);
  }
  distance = dist(linex[0], liney[0], linex[1], liney[1]);

}




function area_() {

  angleMode(DEGREES);

  const d = pixelDensity();

  for (let x = 0; x < img.width; x = x +2) {
    for (let y = 0; y < img.height; y = y + 2) {
      const i = 4 * d * (y * d * img.width + x);
      const [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]]; // get colors
      if (r <= 100 && b <= 100 && g <= 100) { // if r g b all less than 80 then color will appear black


          fill('red');
          ellipse(x, y, 5);
        
        x_vals.push(x);
        y_vals.push(y);

      }
    }
  }

  for (var x = 0; x < x_vals.length; x++) { //From here to the end of the code in this function only has to do with arranging the points in a clockwise order
    SumOfAllX_Values = SumOfAllX_Values + x_vals[x];
  }
  averagexpoint = SumOfAllX_Values / (x_vals.length);
  for (var y = 0; y < y_vals.length; y++) {
    SumOfAllY_Values = SumOfAllY_Values + y_vals[y];
  }
  averageypoint = SumOfAllY_Values / (y_vals.length) //averagexpoint and averageypoint is always in the interior of the shape.

  for (var i = 0; i < x_vals.length; i++) {

    if (x_vals[i] >= averagexpoint && y_vals[i] >= averageypoint) {
      slope = (y_vals[i] - averageypoint) / (x_vals[i] - averagexpoint)
      listofallangles.push(atan(slope));

    }
    if (x_vals[i] >= averagexpoint && y_vals[i] < averageypoint) {
      slope = (y_vals[i] - averageypoint) / (x_vals[i] - averagexpoint)
      listofallangles.push(atan(slope) + 360);

    }

    if (x_vals[i] < averagexpoint && y_vals[i] >= averageypoint) {
      slope = (y_vals[i] - averageypoint) / (x_vals[i] - averagexpoint);
      listofallangles.push(atan(slope) + 180);

    }

    if (x_vals[i] < averagexpoint && y_vals[i] < averageypoint) {
      slope = (y_vals[i] - averageypoint) / (x_vals[i] - averagexpoint);
      listofallangles.push(atan(slope) + 180);

    }
  }
  listofallangles.sort(function(a, b) {
    return a - b;
  })
  for (var j = 0; j < x_vals.length; j++) {
    for (var t = 0; t < x_vals.length; t++) {
      if (x_vals[j] >= averagexpoint && y_vals[j] >= averageypoint) {
        if (atan((y_vals[j] - averageypoint) / (x_vals[j] - averagexpoint)) == listofallangles[t]) {

          x_vals.splice(t, 1, x_vals[j]);
          y_vals.splice(t, 1, y_vals[j]);

        }
        if (x_vals[j] >= averagexpoint && y_vals[j] < averageypoint) {
          if (atan(360 + (y_vals[j] - averageypoint) / (x_vals[j] - averagexpoint)) == listofallangles[t]) {

            x_vals.splice(t, 1, x_vals[j]);
            y_vals.splice(t, 1, y_vals[j]);

          }

        }

        if (x_vals[j] < averagexpoint && y_vals[j] >= averageypoint) {
          if (atan(180 + (y_vals[j] - averageypoint) / (x_vals[j] - averagexpoint)) == listofallangles[t]) {
            x_vals.splice(t, 1, x_vals[j]);
            y_vals.splice(t, 1, y_vals[j]);

          }

        }

        if (x_vals[j] < averagexpoint && y_vals[j] < averageypoint) {

          if (atan(180 + (y_vals[j] - averageypoint) / (x_vals[j] - averagexpoint)) == listofallangles[t]) {

            x_vals.splice(t, 1, x_vals[j]);
            y_vals.splice(t, 1, y_vals[j]);


          }
        }

      }
    }
  }

  areaOfShape();

}



function areaOfShape() {

  for (i = 0; i < x_vals.length; i++) { //shoelace theorem
    areaNotYetMultipliedByHalf = (areaNotYetMultipliedByHalf + x_vals[i % x_vals.length] * y_vals[(i + 1) % x_vals.length] - x_vals[(i + 1) % x_vals.length] * y_vals[i % x_vals.length]);
    area = Math.abs(areaNotYetMultipliedByHalf);
    allareas.push(area);


  }
      document.getElementById("area").innerHTML = "The area is " + (allareas[allareas.length - 2])*(length/distance)*(length/distance);
}
