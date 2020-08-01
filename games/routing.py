from channels.routing import ProtocolTypeRouter, URLRouter
import tic_tac_toe.routing

application = ProtocolTypeRouter({
    # (http -> django views is added by default)
    'websocket': URLRouter(
        tic_tac_toe.routing.websocket_urlpatterns
    )
})