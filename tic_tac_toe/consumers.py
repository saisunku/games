import json
from channels.generic.websocket import JsonWebsocketConsumer
import random

class tic_tac_toe_consumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    @staticmethod
    def random_ai(cur_board):
        flattened_board = [char for row in cur_board for char in row]
        avail_sqr = []	# List that contains the indices of available squares
        for idx, sqr in enumerate(flattened_board):
            if sqr == chr(160):
                avail_sqr.append(idx)

        print(flattened_board)
        print(avail_sqr)

        rand_idx = random.randrange(len(avail_sqr))
        rand_sqr = avail_sqr[rand_idx]	# Index of the chosen square

        print(rand_sqr)

        # Convert to x, y coordinates
        x = rand_sqr // len(cur_board)
        y = rand_sqr % len(cur_board)

        return [x, y]


    def receive_json(self, content):
        cur_player = content['cur_player']
        ai = content['ai']
        cur_board = content['cur_board']

        # print(cur_player, ai)
        # print(cur_board)

        next_move = self.random_ai(cur_board)
        
        # print(next_move)
 
        self.send_json({
            'next_move': next_move
        })
