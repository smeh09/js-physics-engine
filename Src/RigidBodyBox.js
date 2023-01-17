import Vector2 from "./Vector2.js";

class RigidBodyBox
{
  constructor (Position, Width, Height)
  {
    this.Position = Position;
    this.Rotation = 0;

    this.Width = Width;
    this.Height = Height;

    this.TransformedPoints = [];
    this.OriginalPoints = [];

    this.InitBox();
  }
  
  InitBox ()
  {
    this.TransformedPoints = [];
    this.OriginalPoints = [];
    
    this.TransformedPoints.push(
      new Vector2(this.Position.x, this.Position.y),
      new Vector2(this.Position.x + this.Width, this.Position.y),
      new Vector2(this.Position.x + this.Width, this.Position.y + this.Height),
      new Vector2(this.Position.x, this.Position.y + this.Height)
    );
    this.OriginalPoints.push(
      new Vector2(this.Position.x, this.Position.y),
      new Vector2(this.Position.x + this.Width, this.Position.y),
      new Vector2(this.Position.x + this.Width, this.Position.y + this.Height),
      new Vector2(this.Position.x, this.Position.y + this.Height)
    );
  }

  Move(Displacement) {
    this.Position = this.Position.Add(Displacement);

    for (let i = 0; i < this.TransformedPoints.length; i++) {
      this.TransformedPoints[i] = this.TransformedPoints[i].Add(Displacement);
    }

    for (let i = 0; i < this.OriginalPoints.length; i++) {
      this.OriginalPoints[i] = this.OriginalPoints[i].Add(Displacement);
    }
  }

  Rotate(Angle)
  {
    if (this.Rotation === Angle) return;
    this.Rotation = Angle % (Math.PI * 2);
    
    for (let i = 0; i < this.OriginalPoints.length; i++)
    {
      let RotatedPoint = new Vector2(
        this.OriginalPoints[i].x,
        this.OriginalPoints[i].y,
      );

      RotatedPoint.RotateRelative(this.Rotation,
        new Vector2(
          this.Position.x + this.Width/2,
          this.Position.y + this.Height/2
        )
      );
      
      this.TransformedPoints[i].x = RotatedPoint.x;
      this.TransformedPoints[i].y = RotatedPoint.y;
    }
  }
}

export default RigidBodyBox;