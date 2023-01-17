# js-physics-engine
A physics engine made in javascript.

# Structure
This module is distributed in class, and mainly in this version there are
- Collisions class
- RigidBody class
- RigidBodyBox class
- Vector2 class

The collisions class have all the methods related to collision handling.
The vector2 class allows to create 2-Dimensional vectors with a bunch of handy functions
The RigidBodyBox and RigidBody classes are used to make polygons. The main difference in RigidBody and RigidBodyBox is that, when Using RigidBody you enter the points of the polygon, and when using RigidbodyBox, it asks for the x, y, width, and height so it's only suitable for making squares and rectangles.