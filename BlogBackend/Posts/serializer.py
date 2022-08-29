from pyexpat import model
from attr import field
from rest_framework import serializers
from .models import Post, Comments

class PostSerializer(serializers.ModelSerializer):
    # user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta():
        model = Post
        fields = "__all__"
        read_only_fields = ['user']
       
class UserPostSerializer(serializers.ModelSerializer):
    class Meta():
        model = Post
        fields = ['id', 'picture']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = "__all__"
        read_only_fields = ['user', 'post']
