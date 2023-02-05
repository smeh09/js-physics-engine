import Vector2 from "./Vector2.js";

class Collisions {
  IntersectPolygonCircle (VerticesA, CircleCenter, CircleRadius)
  {
    let NormalizedAxis = new Vector2(0, 0);
    let Depth = Number.POSITIVE_INFINITY;
    
    for (let i = 0; i < VerticesA.length; i++)
    {
      let PointA = VerticesA[i];
      let PointB = VerticesA[(i + 1) % VerticesA.length];

      let Edge = PointB.Subtract(PointA);
      let NormalToEdge = new Vector2(-Edge.y, Edge.x);
      NormalToEdge.Normalize();

      let [ MinA, MaxA ] = this.ProjectVertices(VerticesA, NormalToEdge);
      let [ MinB, MaxB ] = this.ProjectCircleVertices(CircleCenter, CircleRadius, NormalToEdge);

      if (MinA >= MaxB || MinB >= MaxA)
      {
        return {
          Collision: false,
        };
      }

      let AxisDepth = Math.min(MaxB - MinA, MaxA - MinB);
      if (AxisDepth < Depth)
      {
        Depth = AxisDepth;
        NormalizedAxis = NormalToEdge;
      }
    }

    let VertexToCircleDistancSquares = VerticesA.map((Vertex) => {
      return (CircleCenter.x - Vertex.x)**2 + (CircleCenter.y - Vertex.y)**2;
    });

    let CircleAxisJSON = JSON.parse(
      JSON.stringify(
        VerticesA[
          VertexToCircleDistancSquares.findIndex(
            (Distance) => Distance - Math.min(...VertexToCircleDistancSquares) === 0
          )
        ]
      )
    );
    let CircleAxis = new Vector2(CircleAxisJSON.x, CircleAxisJSON.y).Subtract(CircleCenter);
    CircleAxis.Normalize();

    let [ MinA, MaxA ] = this.ProjectVertices(VerticesA, CircleAxis);
    let [ MinB, MaxB ] = this.ProjectCircleVertices(CircleCenter, CircleRadius, CircleAxis);

    if (MinA >= MaxB || MinB >= MaxA)
    {
      return {
        Collision: false,
      };
    }

    let AxisDepth = Math.min(MaxB - MinA, MaxA - MinB);
    if (AxisDepth < Depth)
    {
      Depth = AxisDepth;
      NormalizedAxis = CircleAxis;
    }

    let CenterA = this.Mean(VerticesA);
    let Direction = CircleCenter.Subtract(CenterA);
    if (Direction.Dot(NormalizedAxis) > 0) {
      NormalizedAxis = new Vector2(
        -NormalizedAxis.x,
        -NormalizedAxis.y,
      );
    }

    return {
      Collision: true,
      Direction: NormalizedAxis,
      Depth,
    };
  }

  IntersectPolygons (VerticesA, VerticesB)
  {
    let NormalizedAxis = new Vector2(0, 0);
    let Depth = Number.POSITIVE_INFINITY;

    for (let i = 0; i < VerticesA.length; i++)
    {
      let PointA = VerticesA[i];
      let PointB = VerticesA[(i + 1) % VerticesA.length];

      let Edge = PointB.Subtract(PointA);
      let NormalToEdge = new Vector2(-Edge.y, Edge.x);
      NormalToEdge.Normalize();

      let [ MinA, MaxA ] = this.ProjectVertices(VerticesA, NormalToEdge);
      let [ MinB, MaxB ] = this.ProjectVertices(VerticesB, NormalToEdge);

      if (MinA >= MaxB || MinB >= MaxA)
      {
        return {
          Collision: false,
        };
      }

      let AxisDepth = Math.min(MaxB - MinA, MaxA - MinB);
      if (AxisDepth < Depth)
      {
        Depth = AxisDepth;
        NormalizedAxis = NormalToEdge;
      }
    }

    for (let i = 0; i < VerticesB.length; i++)
    {
      let PointA = VerticesB[i];
      let PointB = VerticesB[(i + 1) % VerticesB.length];

      let Edge = PointB.Subtract(PointA);
      let NormalToEdge = new Vector2(-Edge.y, Edge.x);
      NormalToEdge.Normalize();

      let [ MinA, MaxA ] = this.ProjectVertices(VerticesA, NormalToEdge);
      let [ MinB, MaxB ] = this.ProjectVertices(VerticesB, NormalToEdge);

      if (MinA >= MaxB || MinB >= MaxA)
      {
        return {
          Collision: false,
        };
      }

      let AxisDepth = Math.min(MaxB - MinA, MaxA - MinB);
      if (AxisDepth < Depth)
      {
        Depth = AxisDepth;
        NormalizedAxis = NormalToEdge;
      }
    }

    let CenterA = this.Mean(VerticesA);
    let CenterB = this.Mean(VerticesB);

    let Direction = CenterB.Subtract(CenterA);

    if (Direction.Dot(NormalizedAxis) > 0)
    {
      NormalizedAxis = new Vector2(
        -NormalizedAxis.x,
        -NormalizedAxis.y,
      );
    }

    return {
      Collision: true,
      Direction: NormalizedAxis,
      Depth,
    };
  }

  Mean(Vertices)
  {
    let SumX = 0;
    let SumY = 0;

    for (let i = 0; i < Vertices.length; i++)
    {
      SumX += Vertices[i].x;
      SumY += Vertices[i].y;
    }

    return new Vector2(
      SumX / Vertices.length,
      SumY / Vertices.length,
    );
  }

  ProjectCircleVertices (CircleCenter, CircleRadius, Axis)
  {
    let AxisRadius = Axis.Scale(CircleRadius);
    
    let CircleLeftPoint = CircleCenter.Subtract(AxisRadius);
    let CircleRightPoint = CircleCenter.Add(AxisRadius);

    let MinProjection = Axis.Dot(CircleLeftPoint);
    let MaxProjection = Axis.Dot(CircleRightPoint);

    if (MinProjection > MaxProjection)
    {
      let Projection = MinProjection;
      MinProjection = MaxProjection;
      MaxProjection = Projection;
    }
    
    return [
      MinProjection,
      MaxProjection,
    ];
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