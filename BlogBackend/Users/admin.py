import site
from django.contrib import admin
from .models import SupremeUser
from django.contrib.auth.admin import UserAdmin
# Register your models here.
class UserAdminCongfig(UserAdmin):
    search_fields = ('email', 'username')
    ordering = ('-date_joined',)
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_verified', 'is_admin', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'username', 'first_name', 'last_name','password')}),
        ('Permission', {'fields': ('is_admin', 'is_staff', 'is_active', 'is_verified')}),
        ('Personal', {'fields': ('bio', 'profile_picture', 'followers', 'following', 'bio_link')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('email', 'username', 'first_name', 'last_name','password1', 'password2', 'is_active', 'is_staff')
        }),
    )


admin.site.register(SupremeUser, UserAdminCongfig)