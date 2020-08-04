import json
from channels.generic.websocket import JsonWebsocketConsumer

from tic_tac_toe.ttt_game.ttt_game import tic_tac_toe

class tic_tac_toe_consumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive_json(self, content):
        cur_player = content['cur_player']
        ai = content['ai']
        cur_board = content['cur_board']

        # print(cur_player, ai)
        # print(cur_board)

        T = tic_tac_toe(3, ai_player = cur_player, blank_char = chr(160))
        T.board = cur_board

        if ai == 'minimax':
            next_move = T.minimax(cur_player)
        else:
            next_move = T.random_ai(cur_player)

        # Array indexing in the Python module and in JS are opposite of each other
        next_move.reverse()
        
        # print(next_move)
 
        self.send_json({
            'next_move': next_move
        })
