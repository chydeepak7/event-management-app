from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

name = 'Deepak'
description= "This is the first sample event description."
dateTime= "2024-07-15T10:00:00"
location= "Virtual"
organizerName = 'aefdds'
organizerEmail = 'asdsdsdsdf'
category = 'asdf'
image = 'asd'
datas = {
            "name": name,
            "description": description,
            "dateTime": dateTime,
            "location": location,
            "organizer": {
                "name": organizerName,
                "email": organizerEmail
            },
            "category": category,
            "image": image
        }
with open('events.json', 'r') as file:
    data = json.load(file)
data['events'].append(datas)
with open('events.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)
print(data)

@api_view(["GET"])
def getEvents(request):
    return Response(data)

@api_view(['GET'])
def getEvent(request,pk):
    event = None
    for i in data['events']:
        if str(i["id"]) == pk:
            event = i
            break
    return Response(event)
    