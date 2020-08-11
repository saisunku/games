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
        depth = int(content['tree_depth'])

        # print(cur_player, ai)
        # print(cur_board)

        
        if cur_player == 'X':
            opponent = 'O'
        else:
            opponent = 'X'

        if ai == 'minimax' or ai == 'random':
            T = tic_tac_toe(3, ai_player = cur_player, blank_char = chr(160))
            T.board = cur_board

            # Calculate AI move, update the board and then calculate the tree
            if ai == 'minimax':
                next_move = T.minimax(cur_player)
            elif ai == 'random':
                next_move = T.random_ai(cur_player)

            if next_move:
                T.make_move(cur_player, next_move[0], next_move[1])
                
                tree = T.get_minimax_tree(T.board, opponent, depth)
            else:
                tree = T.get_minimax_tree(T.board, cur_player, depth)

        else:
            # Human move, so just calculate tree
            T = tic_tac_toe(3, ai_player = cur_player, blank_char = chr(160))
            T.board = cur_board
            tree = T.get_minimax_tree(T.board, cur_player, depth)

            next_move = None

        # Array indexing in the Python module and in JS are opposite of each other
        if next_move:
            next_move.reverse()
        
        # print(next_move)
 
        self.send_json({
            'next_move': next_move,
            'tree': tree,
        })
