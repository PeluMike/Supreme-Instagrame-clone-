from datetime import datetime
from email.policy import default
from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.conf import settings

import time
from django.utils.text import slugify

# Create your models here.

def profilepicture_upload_path(instance, filename):
    ext = filename.split(".")[-1]
    return "profile_pictures/" +slugify(str(instance.username))+'_' + str(int(time.time())) + "." + ext

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, username, email, password=None):
        if password is None:
            raise TypeError("Password should not be none")
        user = self.create_user( username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True 
        user.is_admin = True
        user.is_verified = True
        user.save()
        return user
    
    

    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('You must provide an email')

        email = self.normalize_email(email)
        user = self.model(username=username ,email=email, **extra_fields)
        user.is_active = True 
        user.set_password(password)
        user.save()

        return user



class SupremeUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=200, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    profile_picture = models.ImageField(upload_to=profilepicture_upload_path, default="profile_pictures/profile.jpg", blank= True, null = True)
    bio = models.TextField(blank=True, null=True)

    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='user_followers', blank=True, symmetrical=False)
    following = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='user_followed', blank=True, symmetrical=False)
    
    bio_link = models.URLField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True) 
    objects = CustomAccountManager()

    USERNAME_FIELD = 'username'
    # REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username