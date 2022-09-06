from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import SupremeUser
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= SupremeUser
        fields = ['username', 'email', 'is_verified', 'profile_picture', 'first_name', 'last_name', 'bio', 'following', 'followers', 'bio_link']



class AllUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= SupremeUser
        fields = ['username', 'email']


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model= SupremeUser
        fields = ['id', 'username', 'email', 'is_verified','profile_picture', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)