from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/', consumers.tic_tac_toe_consumer)
]