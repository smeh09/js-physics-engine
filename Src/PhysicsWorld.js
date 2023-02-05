export default class PhysicsWorld
{
  constructor (Gravity)
  {
    this.Gravity = Gravity;
    this.Objects = [];
  }

  AddObject (Object)
  {
    this.Objects.push(Object);
  }
}