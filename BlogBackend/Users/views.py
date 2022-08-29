from urllib import response
from django.shortcuts import render
from .serializer import UserSerializer, UserSerializerWithToken, AllUserSerializer
from .models import SupremeUser
from django.contrib.auth.hashers import make_password

from Posts.models import Post
from Posts.serializer import UserPostSerializer


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated



# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    user = request.user
    serializer = UserSerializer(user, many=False)

    # getting user post 
    # user_post = user.post_set.all()
    user_post = Post.objects.all().filter(user=user)
    # userPostSerializer = UserPostSerializer(user_post, many=True)
   

    # adding other information
    serializer_data = serializer.data
    serializer_data['followers_count'] = user.followers.all().count()
    serializer_data['following_count'] = user.following.all().count()
    serializer_data['post_count'] = user_post.count()
    # serializer_data['user_post'] = userPostSerializer.data


    return Response(serializer_data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def other_users(request, username):
    user = SupremeUser.objects.get(username=username)
    serializer = UserSerializer(user, many=False)

    # getting user post 
    user_post = Post.objects.all().filter(user=user)

    # adding other information
    serializer_data = serializer.data
    serializer_data['followers_count'] = user.followers.all().count()
    serializer_data['following_count'] = user.following.all().count()
    serializer_data['post_count'] = user_post.count()
    
    return Response(serializer_data)

@api_view(['GET'])
def all_user(request):
    users = SupremeUser.objects.all()
    serializer = AllUserSerializer(users, many= True)

    return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        user = SupremeUser.objects.create(
            username= data['username'],
            email = data["email"],
            password = make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        # if serializer.is_valid():
        #     serializer.save()

        return Response(serializer.data)
    except:
        message = {'details':'username already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def follow_unfollow(request, username):
    user = request.user
    user_to_follow = SupremeUser.objects.get(username=username)
    followed = False
   

    
    if user in user_to_follow.followers.all():
        followed = True
        
    
    if followed:
       user_to_follow.followers.remove(user)
       user.following.remove(user_to_follow)
       return Response({'Detail': 'user unfollowed'})
    else:
        user_to_follow.followers.add(user)
        user.following.add(user_to_follow)
        return Response({'Detail': 'user followed'})


@api_view(['GET'])
def user_followers(request, username):
    user = SupremeUser.objects.get(username=username)
    user_followers = user.followers.all()
    all_user_followers = []

    for users in user_followers:
        all_user_followers.append(users.username)

    followers = {}
    followers['followers_count'] = user_followers.count()
    followers['followered_by'] = all_user_followers

    return Response(followers)

