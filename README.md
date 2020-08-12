# Tic Tac Toe Minimax Visualization

> A web app to visualize the minimax algorithm on a standard tic tac toe board

![gif](http://g.recordit.co/CrDqK9TvP8.gif)

I used the Django framework for the back end. I used WebSockets, as implemented in [django-channels](https://channels.readthedocs.io/), to maintain a persistent connection and push the tree to the client. The tree is rendered using the [d3.js](https://github.com/d3/d3) framework.

Check it out at [https://minimax-visualizer.herokuapp.com/](https://minimax-visualizer.herokuapp.com/)

## Installation

- Clone this repo to your local machine using `https://github.com/saisunku/games.git`

- Create a virtual environment and install everything in `requirements.txt` - `pip install -r requirements.txt`
