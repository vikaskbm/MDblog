from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()

def upload_post_image(instance, filename):
    return f'{instance.user}/{filename}'

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=127)
    slug = models.SlugField()
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()    # markdown
    thumbnail = models.ImageField(upload_to=upload_post_image)
    def __str__(self):
        return self.title