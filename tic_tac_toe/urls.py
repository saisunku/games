from django.urls import path

from . import views

urlpatterns = [
    path('', views.tic_tac_toe, name = 'tic_tac_toe')
]


from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns += staticfiles_urlpatterns()