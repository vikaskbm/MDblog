from rest_framework import generics, serializers
from .models import Post
from .serializers import PostSerialzer

class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerialzer
    permission_classes = [AllowAny]
