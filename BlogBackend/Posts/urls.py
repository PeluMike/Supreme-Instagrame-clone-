from django.urls import path
from . import views

urlpatterns = [
    path('', views.Posts),
    path('post/<pk>/', views.PostPage),
    path('create/post/', views.CreatePost),
    path('create/post/<pk>/comment/', views.CreateComment),
    path('<pk>/comments/', views.getPostComments),
    path('userposts/', views.UserPosts),
    path('otherusersposts/<username>/', views.otherUsersPosts),
    path('like/<pk>/', views.like_unlike),
    path('likes/<pk>/', views.get_post_like),

]