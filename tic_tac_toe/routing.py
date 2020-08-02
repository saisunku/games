from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/tic_tac_toe/', consumers.tic_tac_toe_consumer)
]