import { Vector2, RigidBodyBox, Collisions } from "../../Index.js";

const Container = document.querySelector("#container");
const PolygonsContainer = document.querySelector("#polygons-container");

let LastTime;
let DeltaTime;

function UpdateRenderPoints(Box, BoxElement) {
  BoxElement.points.clear();
  for (let i = 0; i < Box.TransformedPoints.length; i++)
  {
    let PointData = Box.TransformedPoints[i];
    let Point = PolygonsContainer.createSVGPoint();
    Point.x = PointData.x;
    Point.y = PointData.y;
    BoxElement.points.appendItem(Point);
  }
}

const CollisionSystem = new Collisions();

// Box 1
const Box1Pos = new Vector2(900, 50);
const Box1Width = 50;
const Box1Height = 50;
const Box1 = new RigidBodyBox(Box1Pos, Box1Width, Box1Height);
const Box1Element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
Box1Element.style = `
  fill: #C4A54D;
  stroke: black;
  stroke-width: 1;
`;
PolygonsContainer.appendChild(Box1Element);

// Box 2
const Box2Pos = new Vector2(350 - 10*Math.sqrt(2), 250);
const Box2Width = 50;
const Box2Height = 50;
const Box2 = new RigidBodyBox(Box2Pos, Box2Width, Box2Height);
const Box2Element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
Box2Element.style = `
  fill: #1760DB;
  stroke: black;
  stroke-width: 1;
`;
PolygonsContainer.appendChild(Box2Element);

// Box 1 movement
let Box1MovingRight = false;
let Box1MovingLeft = false;
let Box1MovingUp = false;
let Box1MovingDown = false;
const Speed = 200;

document.addEventListener("keydown", (event) => {
  if (event.code === "KeyD") {
    Box1MovingRight = true;
  }
  if (event.code === "KeyA") {
    Box1MovingLeft = true;
  }
  if (event.code === "KeyW") {
    Box1MovingUp = true;
  }
  if (event.code === "KeyS") {
    Box1MovingDown = true;
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "KeyD") {
    Box1MovingRight = false;
  }
  if (event.code === "KeyA") {
    Box1MovingLeft = false;
  }
  if (event.code === "KeyW") {
    Box1MovingUp = false;
  }
  if (event.code === "KeyS") {
    Box1MovingDown = false;
  }
});

function Update(Time)
{
  DeltaTime = (Time - LastTime) / 1000;
  if (DeltaTime > 0.1) DeltaTime = 0.1;
  LastTime = Time;

  let Box1Velocity = new Vector2(0, 0);

  if (Box1MovingRight) {
    Box1Velocity.x += 1;
  }
  if (Box1MovingLeft) {
    Box1Velocity.x -= 1;
  }
  if (Box1MovingUp) {
    Box1Velocity.y -= 1;
  }
  if (Box1MovingDown) {
    Box1Velocity.y += 1;
  }

  if (Box1Velocity.x !== 0 || Box1Velocity.y !== 0) { Box1Velocity.SetMag(Speed * DeltaTime); }

  Box1.Move(Box1Velocity);

  Box1.Rotate(Box1.Rotation + DeltaTime * -2);
  Box2.Rotate(Box2.Rotation + DeltaTime * 1);

  let CollisionResult = CollisionSystem.IntersectPolygons(Box1.TransformedPoints, Box2.TransformedPoints);
  if (CollisionResult.Collision)
  {
    Box1.Move(new Vector2(
      CollisionResult.Direction.x * CollisionResult.Depth * 0.5,
      CollisionResult.Direction.y * CollisionResult.Depth * 0.5
    ));
    Box2.Move(new Vector2(
      -CollisionResult.Direction.x * CollisionResult.Depth * 0.5,
      -CollisionResult.Direction.y * CollisionResult.Depth * 0.5
    ));

    Box2Element.style = `
      fill: #1760DB;
      stroke: red;
      stroke-width: 1;
    `;
    Box1Element.style = `
      fill: #C4A54D;
      stroke: red;
      stroke-width: 1;
    `;
  } else {
    Box2Element.style = `
      fill: #1760DB;
      stroke: black;
      stroke-width: 1;
    `;
    Box1Element.style = `
      fill: #C4A54D;
      stroke: black;
      stroke-width: 1;
    `;
  }

  UpdateRenderPoints(Box1, Box1Element);
  UpdateRenderPoints(Box2, Box2Element);

  requestAnimationFrame(Update);
}

requestAnimationFrame(function (Time) {
  LastTime = Time;
  requestAnimationFrame(Update);
});