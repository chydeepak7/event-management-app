from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)

urlpatterns = [
    path('getevent/',getEvents,name="getEvents" ),
    path('getevent/<str:pk>/',getEvent,name="getEvent" ),
    path('upload/',uploadImage,name="uploadImage" ),
    path('updateevent/<str:id>/', updateEvent, name="updateEvent"),
    path('api/users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
]