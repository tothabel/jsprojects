class Subject {


    constructor(R, immunityChance) {
        this.x = random(10, width - 10);
        this.y = random(10, height - 10);
        this.xspeed = random(-1.5, 1.5);
        this.yspeed = random(-1.5, 1.5);

        this.spawnChance = 9.5;
        this.size = 5;

        this.normal = color(255);
        this.host = color(255, 0, 0);
        this.immune = color(0, 255, 0);
        this.state; //color

        this.R = R; //átlagosan hány emberrel találkozik
        //mielőtt immunis lesz
        this.immunity = 0;
        this.immunityChance = immunityChance;

        this.spawn();
    }

    spawn() {
        if (this.spawnChance < random(0, 10)) {
            this.state = this.host;
        }
        else {
            this.state = this.normal;
        }
    }

    stayInTheBox() {
        if (this.x + this.size / 2 > width) {
            this.xspeed = this.xspeed * -1;
        }
        else if (this.x - this.size / 2 < 0) {
            this.xspeed = this.xspeed * -1;
        }

        if (this.y + this.size / 2 > height) {
            this.yspeed = this.yspeed * -1;
        }
        else if (this.y - this.size / 2 < 0) {
            this.yspeed = this.yspeed * -1;
        }
    }

    infection(other) {
        this.d = dist(this.x, this.y, other.x, other.y);

        if (
            this.d < this.size &&
            this != other &&
            1 > random(0, 3) && //infection chance
            other.immunity < other.R &&
            this.state == this.normal &&
            other.state == other.host
        ) {

            this.state = this.host;
        }
        else if (
            this.d < this.size &&
            this != other &&
            1 > random(0, this.immunityChance) && //immunity++ chance
            other.state == other.host
        ) {

            other.immunity++;
        }
        if (other.immunity > other.R) {
            other.state = other.immune;
        }
    }

    bounceOff(other) {
        this.d = dist(this.x, this.y, other.x, other.y);

        if (this.d < this.size && this != other) {
            this.xspeed = this.xspeed * -1;
            this.yspeed = this.yspeed * -1;
        }
    }

    update() {
        this.stayInTheBox();
        //this.infection(other1);

        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
    }

    show() {
        noStroke();
        fill(this.state);
        circle(this.x, this.y, this.size)
    }
}