import Vector2 from "./Vector2.js";

class Collisions {
  constructor () {  }

  IntersectPolygons (VerticesA, VerticesB)
  {
    for (let i = 0; i < VerticesA.length; i++)
    {
      let PointA = VerticesA[i];
      let PointB = VerticesA[(i + 1) % VerticesA.length];

      let Edge = PointB.Subtract(PointA);
      let NormalToEdge = new Vector2(-Edge.y, Edge.x);

      let [ MinA, MaxA ] = this.ProjectVertices(VerticesA, NormalToEdge);
      let [ MinB, MaxB ] = this.ProjectVertices(VerticesB, NormalToEdge);

      if (MinA >= MaxB || MinB >= MaxA)
      {
        return false;
      }
    }

    for (let i = 0; i < VerticesB.length; i++)
    {
      let PointA = VerticesB[i];
      let PointB = VerticesB[(i + 1) % VerticesB.length];

      let Edge = PointB.Subtract(PointA);
      let NormalToEdge = new Vector2(-Edge.y, Edge.x);

      let [ MinA, MaxA ] = this.ProjectVertices(VerticesA, NormalToEdge);
      let [ MinB, MaxB ] = this.ProjectVertices(VerticesB, NormalToEdge);

      if (MinA >= MaxB || MinB >= MaxA)
      {
        return false;
      }
    }

    return true;
  }

  ProjectVertices (Vertices, Axis)
  {
    let Min = Number.POSITIVE_INFINITY;
    let Max = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < Vertices.length; i++)
    {
      let Vertex = Vertices[i];
      let Projection = Vertex.Dot(Axis);

      if (Projection < Min) { Min = Projection; }
      if (Projection > Max) { Max = Projection; }
    }

    return [
      Min,
      Max,
    ];
  }
}

export default Collisions;