from django.urls import path
from . import views


urlpatterns = [
   path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('profile/', views.user_view),
   path('alluser/', views.all_user),
   path('register/', views.register_user),
   path('profile/<username>/', views.other_users),
   path('follow/<username>/', views.follow_unfollow),
   path('followers/<username>/', views.user_followers),
]