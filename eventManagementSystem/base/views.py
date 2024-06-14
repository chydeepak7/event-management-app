from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
import json
from .forms import *
import os
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password

email = 'Test'
name = 'Deepak'
description= "This is the first sample event description."
date= "2024-07-15T10:00:00"
time=""
location= "Virtual"
category = 'asdf'
price = ''
image = 'asd'
def putData(email,name,description,date,time,location,category,price,image):
    with open('events.json', 'r') as file:
        data = json.load(file)
    id = data['events'][-1]["id"]
    datas = {
        "id": id+1,
        "email": email,
            "name": name,
            "description": description,
            "date": date,
            "time":time,
            "location": location,
            
            "category": category,
            "price":price,
            "image": "/media/"+image.name
        }
    data['events'].append(datas)
    with open('events.json', 'w') as file1:
        json.dump(data,file1,indent=4)
    
with open('events.json', 'r') as file:
    data = json.load(file)


@api_view(["GET"])
def getEvents(request):
    with open('events.json', 'r') as file:
        data = json.load(file)
    return Response(data)

@api_view(['GET'])
def getEvent(request,pk):
    with open('events.json', 'r') as file:
        data = json.load(file)
    event = None
    for i in data['events']:
        if str(i["id"]) == pk:
            event = i
            break
    return Response(event)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    form = ImageUploadForm(request.POST,request.FILES)
    if form.is_valid():
        email = request.user.email
        name = form.cleaned_data["name"]
        description = form.cleaned_data["description"]
        price = form.cleaned_data["price"]
        location = form.cleaned_data["location"]
        date = form.cleaned_data["date"]
        time = form.cleaned_data["time"]
        category = form.cleaned_data["category"]
        image = request.FILES['image']
        putData(email,name,description,date,time,location,category,price,image)
        with open('./' + image.name, 'wb+') as destination:
            for chunk in image.chunks():
                destination.write(chunk)
        with open('events.json', 'r') as file:
            data = json.load(file)
    else:
        form = ImageUploadForm()
    return Response({"detail": "Invalid form data"}, status=400)
        
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateEvent(request, id):
    id = int(id)  # Ensure the id is an integer
    with open('events.json', 'r') as file:
        data = json.load(file)

    # Find the event by id
    event = next((event for event in data['events'] if event['id'] == id), None)

    if event:
        # Update the event with new data
        event['name'] = request.data.get('name', event['name'])
        event['description'] = request.data.get('description', event['description'])
        event['location'] = request.data.get('location', event['location'])
        event['price'] = request.data.get('price', event['price'])
        event['category'] = request.data.get('category', event['category'])
        event['date'] = request.data.get('date', event['date'])
        event['time'] = request.data.get('time', event['time'])

        # If a new image is uploaded, save it and update the image path
        if 'image' in request.FILES:
            image = request.FILES['image']
            # image_path = os.path.join('media', image.name)
            with open('./'+image.name, 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)
            event['image'] = './'+image.name

        # Write the updated events list back to the JSON file
        with open('events.json', 'w') as file:
            json.dump(data, file, indent=4)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteEvent(request, id):
    id = int(id)
    with open('events.json', 'r') as file:
        data = json.load(file)

    # Find the event by id
    event = next((event for event in data['events'] if event['id'] == id), None)

    if event:
        data['events'] = [event for event in  data['events'] if event['id'] != id]

        # Write the updated events list back to the JSON file
        with open('events.json', 'w') as file:
            json.dump(data, file, indent=4)
    return Response("event deleted")




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user= User.objects.all()
    serializer = UserSerializer(user,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    try:
        data =request.data
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'email or username already exists'}
        return Response(message)
