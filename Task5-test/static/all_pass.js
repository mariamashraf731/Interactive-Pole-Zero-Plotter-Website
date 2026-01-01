class AllPass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dragging = false;
        this.selected = false;
        this.custom = false;
    }
    show(c = '#ff0') {
        
            // change color when mouse is on the object:
            if (this.inRange()) { c = '#00f'; }
            // points inside the square:
            if (this.dragging) {
                if (mouseX > width) {
                    this.x = width;
                }
                else if (mouseX < 0) {
                    this.x = 0;
                } else {
                    this.x = mouseX;
                }
                if (mouseY > height) {
                    this.y = height;
                }
                else if (mouseY < 0) {
                    this.y = 0;
                } else {
                    this.y = mouseY;

                }
            }
        
        //        // points inside the main circle only:-
        //        if(this.dragging && dist(mouseX,mouseY,width / 2, height / 2)<=200){
        //              this.x = mouseX;
        //              this.y = mouseY;
        //           }
        //        else if(this.dragging) {
        //            let angle = Math.atan((mouseY - height / 2) / (mouseX - width / 2));// angle of rotation
        //            let R = Math.sign(mouseX - width / 2) * 200;                        //sign (left part or right part) * radius 
        //            this.x = width/2 + R*Math.cos(angle); 
        //            this.y = height/2 + R*Math.sin(angle);
        //        }
        stroke(c);
        fill(c);
        strokeWeight(2);
        if (this.selected) {
            square(this.x - 5, this.y - 5, 10);
        }
    }

    inRange() {
        if (this.custom && dist(mouseX, mouseY, this.x, this.y) <= 5) {
            return true;
        } else {
            return false;
        }
    }
    Drag() {
        // Did I click on the circle?
        if (this.inRange() && this.selected) {
            this.dragging = true;
        }
    }
    release() {
        // Quit dragging
        this.dragging = false;
    }
}