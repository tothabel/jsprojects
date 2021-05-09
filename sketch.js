var population = 100;
var R = 3;
var immunityChance = 5;
var people = [];
var rslider;
var islider;
var pslider;

function setup() {
  createCanvas(640, 360);

  pslider = createSlider(50, 250, 100, 1);
  rslider = createSlider(0.9, 5, 2.5, 0.5);
  islider = createSlider(2, 10, 5, 1);

}

function keyPressed() {
  if (keyCode == ENTER) {
    people.splice(0, 250);

    for (let i = 0; i < pslider.value(); i++) {
      people.push(new Subject(rslider.value(), islider.value()));
    }
  }
}

function draw() {
  background(51);

  for (let i = 0; i < people.length; i++) {
    people[i].show();
    people[i].update();

    for (let j = 0; j < people.length; j++) {
      people[i].infection(people[j]);
      people[i].bounceOff(people[j]);
    }
  }

  textSize(10);
  fill(255);
  text("population: " + pslider.value(), 35, 350);

  textSize(10);
  fill(255);
  text("R: " + rslider.value(), 190, 350);

  textSize(10);
  fill(255);
  text("immunity: " + islider.value(), 305, 350);
}
