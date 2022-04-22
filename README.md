# circuits


## Gameplay
An emergency happened and now we have to make circuits! 

Make circuits as fast as you can! 

Circuits is a puzzle game heavily influenced by Loopz for NES. Use controls to direct the pieces of wire to complete full circuits, lighting up the grid and clearing the workspace. 

## Wireframe

The game consists of a horizontal board that is 8 X 20 cells. Below the board is a display that contains a box with the next piece, the current score and the current high score. A timer runs down as a bar on the right side of the board. 

## Implementation
### Display

Vanilla JS?

### Movement

The pieces are moved using the arrow keys, and the pieces are rotated using the space-bar. 

### Tracking Completion

Each occupied cell on the board represents a node as part of a linked list. A loop will be considered complete when the node is able to track along the path back to itself. The wire pieces are not directional, therefore each node is bi-directional.


## Future Improvements

Create an alternate mode in which the player watches a circuit be disassembled, and then they must put it together correctly. 

Create additional pieces for the board, such as resistors or batteries to increase the possibilities of gameplay. 