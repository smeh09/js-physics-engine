import Vector2 from "./Vector2.js";

class RigidBody
{
  constructor (Points)
  {
    this.OriginalPoints = JSON.parse(JSON.stringify(Points));
    for (let i = 0; i < this.OriginalPoints.length; i++)
    {
      this.OriginalPoints[i] = new Vector2(
        this.OriginalPoints[i].x,
        this.OriginalPoints[i].y,
      );
    }
    this.TransformedPoints = JSON.parse(JSON.stringify(Points));
    for (let i = 0; i < this.TransformedPoints.length; i++)
    {
      this.TransformedPoints[i] = new Vector2(
        this.TransformedPoints[i].x,
        this.TransformedPoints[i].y,
      );
    }
    this.Rotation = 0;
  }

  Move (Displacement) {
    for (let i = 0; i < this.TransformedPoints.length; i++)
    {
      this.TransformedPoints[i] = this.TransformedPoints[i].Add(Displacement);
    }
    for (let i = 0; i < this.OriginalPoints.length; i++)
    {
      this.OriginalPoints[i] = this.OriginalPoints[i].Add(Displacement);
    }
  }

  Rotate (Angle) {
    let SumX = 0;
    let SumY = 0;

    for (let i = 0; i < this.OriginalPoints.length; i++)
    {
      SumX += this.OriginalPoints[i].x;
      SumY += this.OriginalPoints[i].y;
    }

    let CenterPos = new Vector2(
      SumX / this.OriginalPoints.length,
      SumY / this.OriginalPoints.length,
    );

    this.Rotation = Angle % (Math.PI * 2);

    for (let i = 0; i < this.TransformedPoints.length; i++)
    {
      let RotatedPoint = new Vector2(
        this.OriginalPoints[i].x,
        this.OriginalPoints[i].y,
      );

      RotatedPoint.RotateRelative(this.Rotation, CenterPos);
      
      this.TransformedPoints[i].x = RotatedPoint.x;
      this.TransformedPoints[i].y = RotatedPoint.y;
    }
  }
}

export default RigidBody;