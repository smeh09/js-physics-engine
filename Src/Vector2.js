class Vector2
{
  constructor (x, y)
  {
    this.x = x;
    this.y = y;
  }

  Add(vector)
  {
    return new Vector2(
      this.x + vector.x,
      this.y + vector.y
    );
  }

  Subtract(vector)
  {
    return new Vector2(
      this.x - vector.x,
      this.y - vector.y
    );
  }

  Dot(vector)
  {
    return (this.x * vector.x) + (this.y * vector.y);
  }

  GetMag()
  {
    return Math.sqrt((this.x)**2 + (this.y)**2);
  }

  GetMagSqred()
  {
    return (this.x)**2 + (this.y)**2;
  }

  Normalize()
  {
    let mag = this.GetMag();
    this.x /= mag;
    this.y /= mag;
  }

  Scale(Multiplier)
  {
    return new Vector2(this.x * Multiplier, this.y * Multiplier);
  }

  SetMag(mag)
  {
    this.Normalize();
    this.x *= mag;
    this.y *= mag;
  }

  Rotate(angle)
  {
    this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    this.y = this.y * Math.cos(angle) + this.x * Math.sin(angle);
  }

  RotateRelative(angle, position)
  {
    let RelY = this.y - position.y;
    let RelX = this.x - position.x;
    let updatedX = RelX * Math.cos(angle) - RelY * Math.sin(angle);
    let updatedY = RelY * Math.cos(angle) + RelX * Math.sin(angle);
    this.x = updatedX + position.x;
    this.y = updatedY + position.y;
  }
}

export default Vector2;