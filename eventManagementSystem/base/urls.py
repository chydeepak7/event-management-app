from django.urls import path
from .views import *
urlpatterns = [
    path('test/',getEvents,name="getEvents" )
]