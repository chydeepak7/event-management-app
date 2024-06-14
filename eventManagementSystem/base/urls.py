from django.urls import path
from .views import *

urlpatterns = [
    path('getevent/', getEvents, name="getEvents"),
    path('getevent/<str:pk>/', getEvent, name="getEvent"),
    path('upload/', uploadImage, name="uploadImage"),
    path('updateevent/<str:id>/', updateEvent, name="updateEvent"),
    path('event/delete/<str:id>/', deleteEvent, name="deleteEvent"),

    path('api/users/', getUsers, name="getUsers"),
    path('api/users/profile/', getUserProfile, name="getUserProfile"),
    path('api/users/register/', registerUser, name="registerUser"),
    path('api/users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

]
