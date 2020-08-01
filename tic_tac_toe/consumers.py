import json
from channels.generic.websocket import JsonWebsocketConsumer

class tic_tac_toe_consumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnext(self, close_code):
        pass

    def receive_json(self, content):
        player = content['player']
        cur_board = content['cur_board']

        print(player)
        print(cur_board)

        self.send_json({
            'player': player + ' re-send'
        })
