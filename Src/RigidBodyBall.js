export default class RigidBodyBall
{
    constructor (Center, Radius)
    {
        this.Position = Center;
        this.Radius = Radius;
    }

    Move(Displacement)
    {
        this.Position = this.Position.Add(Displacement);
    }
}