import { Vector2, RigidBodyBox, RigidBodyBall, RigidBody, Collisions } from "../../Index.js";

const Container = document.querySelector("#container");
const PolygonsContainer = document.querySelector("#polygons-container");

function Random(Min, Max)
{
    return Math.floor(Math.random() * (Max - Min + 1) ) + Min;
}

function Lerp(a, b, t)
{
    return a + (b - a) * t;
}

let LastTime;
let DeltaTime;

function UpdateRenderPoints(Box, BoxElement)
{
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

const TopGround1Element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
TopGround1Element.style = `fill: white;`;
PolygonsContainer.appendChild(TopGround1Element);
const TopGround1 = new RigidBodyBox(new Vector2(-30, 350), 350, 40);
TopGround1.Rotate(Math.PI/7);
TopGround1.RotationalVelocity = 0;

const TopGround2Element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
TopGround2Element.style = `fill: white;`;
PolygonsContainer.appendChild(TopGround2Element);
const TopGround2 = new RigidBodyBox(new Vector2(668, 250), 300, 40);
TopGround2.Rotate(-Math.PI/15);
TopGround2.RotationalVelocity = 0;

const TopGround3Element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
TopGround3Element.style = `fill: white;`;
PolygonsContainer.appendChild(TopGround3Element);
const TopGround3 = new RigidBodyBox(new Vector2(300, 200), 200, 30);
TopGround3.Rotate(-Math.PI/15);
TopGround3.RotationalVelocity = 2;

const BaseGroundElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
BaseGroundElement.style = `fill: white;`;
PolygonsContainer.appendChild(BaseGroundElement);
const BaseGround = new RigidBodyBox(new Vector2(0, 600 - 40/2), 960, 40);
BaseGround.RotationalVelocity = 0;

let GroundData = [TopGround1, TopGround2, TopGround3, BaseGround];

let Objects = [];

const GRAVITY = 500;

Container.addEventListener('click', (event) => {
    const Rect = Container.getBoundingClientRect();
    let mx = event.clientX - Rect.left;
    let my = event.clientY - Rect.top;

    const Element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    Element.style = `stroke: white; stroke-width: 1`;
    PolygonsContainer.appendChild(Element);

    let Width = Random(10, 35);
    let Height = Random(10, 35);

    const Object = new RigidBodyBox(new Vector2(mx, my), Width, Height);
    Object.LinearVelocity = new Vector2(0, GRAVITY);
    Object.RotationalVelocity = Random(-5, 5);

    Objects.push({
        Shape: 'Box',
        Object,
        Element,
    });
});

function Update(Time)
{
  DeltaTime = (Time - LastTime) / 1000;
  if (DeltaTime > 0.1) DeltaTime = 0.1;
  LastTime = Time;

  BaseGround.Update(DeltaTime);
  
  Objects.forEach((Object, Index) => {
    Object.Object.Update(DeltaTime);
    if (Object.Shape === 'Box')
    {
        GroundData.forEach((Ground) => {
            const CollisionResult = new Collisions().IntersectPolygons(Object.Object.TransformedPoints, Ground.TransformedPoints);
            if (CollisionResult.Collision)
            {
                Object.Object.Move(new Vector2(
                    CollisionResult.Direction.x * CollisionResult.Depth,
                    CollisionResult.Direction.y * CollisionResult.Depth,
                ));
                Object.Object.RotationalVelocity = 0;
            } 
        });

        Objects.forEach((Object2, j) => {
            if (Index !== j)
            {
                const CollisionResult = new Collisions().IntersectPolygons(Object.Object.TransformedPoints, Object2.Object.TransformedPoints);
                if (CollisionResult.Collision)
                {
                    Object.Object.Move(new Vector2(
                        CollisionResult.Direction.x * CollisionResult.Depth * 0.5,
                        CollisionResult.Direction.y * CollisionResult.Depth * 0.5,
                    ));
                    Object2.Object.Move(new Vector2(
                        -CollisionResult.Direction.x * CollisionResult.Depth * 0.5,
                        -CollisionResult.Direction.y * CollisionResult.Depth * 0.5,
                    ));
                    Object.Object.RotationalVelocity = 0;
                }
            }
        });

        UpdateRenderPoints(Object.Object, Object.Element);
    }
  });

  TopGround3.Update(DeltaTime);

  UpdateRenderPoints(BaseGround, BaseGroundElement);
  UpdateRenderPoints(TopGround1, TopGround1Element);
  UpdateRenderPoints(TopGround2, TopGround2Element);
  UpdateRenderPoints(TopGround3, TopGround3Element);
  
  requestAnimationFrame(Update);
}

requestAnimationFrame(function (Time) {
  LastTime = Time;
  requestAnimationFrame(Update);
});