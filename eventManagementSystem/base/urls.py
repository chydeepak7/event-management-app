from django.urls import path
from .views import *
urlpatterns = [
    path('getevent/',getEvents,name="getEvents" ),
    path('getevent/<str:pk>/',getEvent,name="getEvent" )
]