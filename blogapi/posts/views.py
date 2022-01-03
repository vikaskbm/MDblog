from django.db.models.query import QuerySet
from rest_framework import generics
from rest_framework import permissions
from rest_framework.utils import serializer_helpers
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer


class PostListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny,]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
class PostDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny,]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

class PostCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = PostCreateSerializer

    def perform_create(self, serializer):
        print(self.request.user)
        serializer.save(user=self.request.user)

class PostUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = PostCreateSerializer
    queryset = Post.objects.all()
    lookup_field = 'slug'
