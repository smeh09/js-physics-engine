import Vector2 from "./Vector2.js";

export default class RigidBodyBall
{
    constructor (Center, Radius)
    {
        this.Position = Center;
        this.Radius = Radius;

        this.LinearVelocity = new Vector2(0, 0);
    }

    Move(Displacement)
    {
        this.Position = this.Position.Add(Displacement);
    }

    Update (Deltatime)
    {
        this.Move(this.LinearVelocity.Scale(Deltatime));
    }
}