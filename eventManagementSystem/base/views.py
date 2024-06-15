from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from datetime import datetime
from rest_framework.response import Response
from rest_framework import status
import json
from .forms import ImageUploadForm
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

def putData(email, name, description, date, endDate, time, location, category, price, totalParticipants, image):
    with open('events.json', 'r') as file:
        data = json.load(file)
    id = data['events'][-1]["id"]
    datas = {
        "id": id + 1,
        "email": email,
        "name": name,
        "description": description,
        "date": date,
        "endDate": endDate,
        "time": time,
        "location": location,
        "category": category,
        "price": price,
        "totalParticipants": totalParticipants,
        "image": "/media/" + image.name
    }
    data['events'].append(datas)
    with open('events.json', 'w') as file1:
        json.dump(data, file1, indent=4)


with open('events.json', 'r') as file:
    data = json.load(file)

@api_view(["GET"])
def getEvents(request):
    query_keyword = request.query_params.get("keyword", "").strip().lower()
    query_date = request.query_params.get("date", "")
    query_endDate = request.query_params.get("endDate", "")
    query_totalParticipants = request.query_params.get("totalParticipants", "")

    with open('events.json', 'r') as file:
        data = json.load(file)

    filtered_events = []

    for event in data['events']:
        if (not query_keyword or query_keyword in event.get('name', '').lower()) and \
           (not query_date or query_date == event.get('date', '')) and \
           (not query_endDate or query_endDate == event.get('endDate', '')) and \
           (not query_totalParticipants or query_totalParticipants == str(event.get('totalParticipants', ''))):
            filtered_events.append(event)

    response_data = {'events': filtered_events}
    return Response(response_data)

@api_view(['GET'])
def getEvent(request, pk):
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
    form = ImageUploadForm(request.POST, request.FILES)
    if form.is_valid():
        email = request.user.email
        name = form.cleaned_data["name"]
        description = form.cleaned_data["description"]
        price = form.cleaned_data["price"]
        location = form.cleaned_data["location"]
        date = form.cleaned_data["date"]
        endDate = form.cleaned_data["endDate"]
        time = form.cleaned_data["time"]
        category = form.cleaned_data["category"]
        totalParticipants = form.cleaned_data["totalParticipants"]
        image = request.FILES['image']
        putData(email, name, description, date, endDate, time, location, category, price, totalParticipants, image)
        with open('./' + image.name, 'wb+') as destination:
            for chunk in image.chunks():
                destination.write(chunk)
        with open('events.json', 'r') as file:
            data = json.load(file)
        return Response({"detail": "Image uploaded successfully"}, status=201)
    else:
        return Response({"detail": "Invalid form data"}, status=400)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateEvent(request, id):
    try:
        id = int(id)
        with open('events.json', 'r') as file:
            data = json.load(file)

        event = next((event for event in data['events'] if event['id'] == id), None)

        if event:
            event['name'] = request.data.get('name', event['name'])
            event['description'] = request.data.get('description', event['description'])
            event['location'] = request.data.get('location', event['location'])
            event['price'] = request.data.get('price', event['price'])
            event['category'] = request.data.get('category', event['category'])
            event['date'] = request.data.get('date', event['date'])
            event['endDate'] = request.data.get('endDate', event.get('endDate', ''))  # Ensure 'endDate' exists
            event['time'] = request.data.get('time', event['time'])
            event['totalParticipants'] = request.data.get('totalParticipants', event['totalParticipants'])

            if 'image' in request.FILES:
                image = request.FILES['image']
                with open('./media/' + image.name, 'wb+') as destination:
                    for chunk in image.chunks():
                        destination.write(chunk)
                event['image'] = '/media/' + image.name

            with open('events.json', 'w') as file:
                json.dump(data, file, indent=4)

            return Response(event, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    except KeyError as e:
        return Response({"error": f"KeyError: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    except FileNotFoundError as e:
        return Response({"error": f"FileNotFoundError: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteEvent(request, id):
    id = int(id)
    with open('events.json', 'r') as file:
        data = json.load(file)
    data['events'] = [event for event in data['events'] if event['id'] != id]
    with open('events.json', 'w') as file:
        json.dump(data, file, indent=4)
    return Response("event deleted")

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
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
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    try:
        data = request.data
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'email or username already exists'}
        return Response(message)
