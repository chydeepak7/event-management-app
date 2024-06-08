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