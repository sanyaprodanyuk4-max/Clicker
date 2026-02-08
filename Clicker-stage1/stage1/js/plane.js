"use strict";

class CoordinateSystem {
  width = document.body.clientWidth;
  height = document.body.clientHeight;
  x0 = this.width / 2;
  y0 = this.height / 2;
}

let coordinateSystem = new CoordinateSystem();

class Plane {
  /// Змінив рух літака на  (W S A D ) (PRODANIUK)
  plane_box = document.getElementById("plane_box");
  plane = document.getElementById("plane");
  width = this.plane_box.clientWidth;
  height = this.plane_box.clientHeight;

  xc = coordinateSystem.x0;
  yc = coordinateSystem.y0;
  hp = 100;
  speed = 5;
  keys = {
    w: false,
    a: false,
    s: false,
    d: false,
  };

  constructor() {
    this.initControls();
  }

  initControls() {
    window.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();
      if (this.keys.hasOwnProperty(key)) this.keys[key] = true;
    });

    window.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase();
      if (this.keys.hasOwnProperty(key)) this.keys[key] = false;
    });
  }

  fly() {
    let timePlane = setInterval(() => {
      if (this.crash()) {
        clearInterval(timePlane);
        return;
      }
      this.hpLine();

      let oldX = this.xc;
      let oldY = this.yc;

      if (this.keys.w) this.yc -= this.speed;
      if (this.keys.s) this.yc += this.speed;
      if (this.keys.a) this.xc -= this.speed;
      if (this.keys.d) this.xc += this.speed;

      this.plane_box.style.left = this.xc - this.width / 2 + "px";
      this.plane_box.style.top = this.yc - this.height / 2 + "px";

      if (this.xc !== oldX || this.yc !== oldY) {
        let angle = Math.atan2(this.yc - oldY, this.xc - oldX);
        this.plane.style.transform = `rotate(${angle}rad)`;
      }
    }, 20);
  }

  crash() {
    if (this.hp <= 0) {
      this.destroyed = true;
      plane_box.remove();
      destroyedEvent("boom", this.xc, this.yc);
      document.body.style.cursor = "default";
      return true;
    }
  }

  hpLine() {
    document.getElementById("hp_line").style.width = `${this.hp}%`;
  }
}
