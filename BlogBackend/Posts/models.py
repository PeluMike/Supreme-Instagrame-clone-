from distutils.command.upload import upload
from email.policy import default
from django.db import models
import uuid
from django.conf import settings

from django.utils.text import slugify
import time

from Users.models import SupremeUser
# Create your models here.

def post_image_upload_path(instance, filename):
    ext = filename.split(".")[-1]
    return 'Post_pictures/' + slugify(str(instance.id))+'_' + str(int(time.time())) + "." + ext

class Post(models.Model):
    user = models.ForeignKey(SupremeUser, on_delete=models.CASCADE, blank=False, related_name='users')
    caption = models.TextField(blank =True, null= True)
    picture = models.ImageField(upload_to=post_image_upload_path )
    date_created = models.DateTimeField(auto_now_add=True)
    like = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='like')
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __int__(self):
        return self.id

# class PostImages(models.Model):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='Post_pictures')


class Comments(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name='user')
    post = models.ForeignKey('Post', on_delete=models.CASCADE, blank=False, related_name='post')
    comment = models.TextField()
    time_created = models.DateField(auto_now_add=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


