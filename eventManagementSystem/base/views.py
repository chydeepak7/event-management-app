from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from .forms import *
import os

name = 'Deepak'
description= "This is the first sample event description."
date= "2024-07-15T10:00:00"
time=""
location= "Virtual"
category = 'asdf'
price = ''
image = 'asd'
def putData(name,description,date,time,location,category,price,image):
    with open('events.json', 'r') as file:
        data = json.load(file)
    id = data['events'][-1]["id"]
    datas = {
        "id": id+1,
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
def uploadImage(request):
    form = ImageUploadForm(request.POST,request.FILES)
    if form.is_valid():
        name = form.cleaned_data["name"]
        description = form.cleaned_data["description"]
        price = form.cleaned_data["price"]
        location = form.cleaned_data["location"]
        date = form.cleaned_data["date"]
        time = form.cleaned_data["time"]
        category = form.cleaned_data["category"]
        image = request.FILES['image']
        putData(name,description,date,time,location,category,price,image)
        with open('./' + image.name, 'wb+') as destination:
            for chunk in image.chunks():
                destination.write(chunk)
        with open('events.json', 'r') as file:
            data = json.load(file)
            
        
    else:
        form = ImageUploadForm()
    return 
        
@api_view(["PUT"])
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