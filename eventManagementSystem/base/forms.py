from django import forms

class ImageUploadForm(forms.Form):
    name = forms.CharField(max_length=100)
    category = forms.CharField(max_length=50)
    location = forms.CharField(max_length=50)
    price = forms.CharField(max_length=50)
    date = forms.CharField(max_length=50)
    time = forms.CharField(max_length=50)
    description = forms.CharField(max_length=500)
    image = forms.ImageField()
