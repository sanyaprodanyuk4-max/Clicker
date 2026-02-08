"use strict";

function distance(x1, y1, x2, y2) {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** (1 / 2);
}

function getNumBetween(minNum, maxNum) {
  return minNum + Math.floor(Math.random() * (maxNum - minNum + 1));
}

document.body.addEventListener("click", (e) => {
  if (plane.destroyed) {
    return;
  }
  let x1 = plane.xc;
  let y1 = plane.yc;
  let x2 = e.clientX;
  let y2 = e.clientY;
  let idTarget = e.target.id;

  let laser = new laserRay(x1, y1, x2, y2);
  laser.drawLaserRay();
  setTimeout(() => {
    document.getElementById("ray").remove();
  }, 50);

  if (e.target.classList.contains("rocket")) {
    let targetXc = rockets[idTarget].xc;
    let targetYc = rockets[idTarget].yc;
    if (distance(targetXc, targetYc, x2, y2) <= rockets[idTarget].width / 2) {
      points++;
      e.target.classList.remove("rocket");
      e.target.remove();
      destroyedEvent("bang", x2, y2)
      delete rockets[idTarget];
    }
  }
  shots++;
  let accuracy = points / shots * 100;
  document.getElementById("points").textContent = `Влучання: ${points}`;
  document.getElementById("shots").textContent = `Пострілів: ${shots}`;
  document.getElementById("accuracy").textContent = `Відсоток влучань: ${accuracy.toFixed(0)}%`;
});

document.body.addEventListener("mousemove", (e) => {
  if (e.target.classList[0] === "rocket") {
    let idTarget = e.target.id;
    let xc = rockets[idTarget].xc;
    let yc = rockets[idTarget].yc;
    let xMouse = e.clientX;
    let yMouse = e.clientY;
    if (distance(xc, yc, xMouse, yMouse) < rockets[idTarget].width) {
      e.target.classList.add("cursorRocket");
    }
  }
});

function destroyedEvent(event, x, y) {
  let element = document.createElement(event);
  element.classList.add(event);
  document.body.append(element);
  element.style.left = (x - element.clientWidth / 2) + "px";
  element.style.top = (y - element.clientHeight / 2) + "px";
}