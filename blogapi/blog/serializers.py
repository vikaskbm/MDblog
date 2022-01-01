from rest_framework import serializers
from .models import Post

class PostSerialzer(serializers.Serializer):
    title = serializers.CharField()
    content = serializers.CharField()