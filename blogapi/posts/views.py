from django.db.models.query import QuerySet
from rest_framework import generics
from rest_framework import permissions
from rest_framework.utils import serializer_helpers
from .models import Post
from .serializers import PostSerializer


class PostListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny,]
    queryset = Post.objects.all()
    serializer_class = PostSerializer