
from django.http import JsonResponse
from django.shortcuts import render, HttpResponse
from requests import post
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

import time
from .time import timing

from Users.models import SupremeUser

from .serializer import PostSerializer, CommentSerializer, UserPostSerializer
from .models import Post, Comments
from rest_framework.permissions import IsAuthenticated

from datetime import datetime
from django.utils import timezone


# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Posts(request):
    post = Post.objects.all().order_by('-date_created')
    serializer = PostSerializer(post, many=True)
    post_len = len(serializer.data)
    serializerData = serializer.data
    serializer_data =[]
    
    
    for i,posts in enumerate(post):
        postLikedBy = []
        serializer_edits = serializerData[i]
        posts_comments = Comments.objects.all().filter(post=posts).count()

        if request.user in posts.like.all():
            likedByMe = True
            serializer_edits['liked_by_me'] = True
        else:
            serializer_edits['liked_by_me'] = False
           
        if request.user == posts.user:
            postedByMe = True
            serializer_edits['posted_by_me'] = True
        else:
            serializer_edits['posted_by_me'] = False
       
        for users in posts.like.all():
           postLikedBy.append(users.username)
        
        
        serializer_edits['user'] = posts.user.username
        serializer_edits['like'] = posts.like.all().count()
        serializer_edits['Poster_pro'] = posts.user.profile_picture.url
        serializer_edits['poster_isVerified']= posts.user.is_verified
        serializer_edits['post_comments_count'] = posts_comments
        serializer_edits['post_liked_by']= postLikedBy
        
        serializer_data.append(serializer_edits)

    
    
   
    
    return Response(serializer_data)
   

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def PostPage(request, pk):
    # posts
    post = Post.objects.get(id=pk)

    postLikedBy = []

    # checking for stuffs :)
    likedByMe = False
    postedByMe = False
    for likes in post.like.all():
       postLikedBy.append(likes.username)
    
    if request.user in post.like.all():
        likedByMe = True

    if request.user == post.user:
        postedByMe = True
    

    # customizing the post time 

    timenow = datetime.now()
    posttime = post.date_created

    # print(timenow-posttime)




    # print(posttime)
    # print (timing(timenow, posttime))
    gg = timing(posttime)
    print(gg)


    # serializing the post
    serializer = PostSerializer(post, many=False)
    
    # modify the post serializer 
    serializer_data = serializer.data
    serializer_data['like'] = post.like.all().count()
    serializer_data['Poster_pro'] = post.user.profile_picture.url
    serializer_data['user'] = post.user.username
    serializer_data['liked_by'] = postLikedBy
    serializer_data['liked_by_me'] = likedByMe
    serializer_data['poster_isVerified']= post.user.is_verified
    serializer_data['posted_by_me']= postedByMe
    serializer_data['date_created']= timenow


    return Response(serializer_data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPostComments(request, pk):
    post = Post.objects.get(id=pk)
    comments = Comments.objects.filter(post=post)
    comments_len = len(comments)
    comment_final =[]
    serializer = CommentSerializer(comments, many=True)

    # modify the comment serializer 
    comment_serializer_data = serializer.data
    for i,comment in zip(range(comments_len), comments):
        comment_serializer_edit = comment_serializer_data[i]
        comment_serializer_edit['user'] = comment.user.username
        comment_serializer_edit['commemtor_pic'] = comment.user.profile_picture.url
        comment_final.append(comment_serializer_edit)

    return Response(comment_final)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserPosts(request):
    user = request.user
    user_post = Post.objects.all().filter(user=user)
    userPostSerializer = UserPostSerializer(user_post, many=True)
    return Response(userPostSerializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def otherUsersPosts(request, username):
    user = SupremeUser.objects.get(username=username)
    user_post = Post.objects.all().filter(user=user)
    userPostSerializer = UserPostSerializer(user_post, many=True)
    return Response(userPostSerializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CreatePost(request):
    serializer = PostSerializer(data=request.data)
    # print(serializer.initial_data)
    
    if serializer.is_valid():
        serializer.validated_data['user'] = request.user
        serializer.save()
        message = {
            'message': 'form created successfully'
        }

        return Response(serializer.data)
    else:
        message = {
            'message': 'form not created'
        }
        return Response(message)


@api_view(['POST'])
def CreateComment(request, pk):
    post = Post.objects.get(id=pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.validated_data['user'] = request.user
        serializer.validated_data['post'] = post
        serializer.save()
        return Response(serializer.data)
    else:
        message = {
            'detail':'an error occured'
        }

        return Response(message)


@api_view(['POST'])
def like_unlike(request, pk):
    post = Post.objects.get(id=pk)
    user = request.user
    is_liked = False
    
    for likes in post.like.all():
        if likes == user:
            is_liked = True
            break
        
    if is_liked:
        post.like.remove(user)
        return Response({'Detail':'Post like remove'})
    else:
        post.like.add(user)
        return Response({'Detail':'Post like added'})
    


@api_view(['GET'])
def get_post_like(request, pk):
    post = Post.objects.get(id=pk)
    user = request.user
    serializer_edits ={}
    likes_count = post.like.all().count()

    if user in post.like.all():
        likedByMe = True
        serializer_edits['liked_by_me'] = True
    else:
        serializer_edits['liked_by_me'] = False
    
    serializer_edits['like'] = likes_count
        
    return Response(serializer_edits)