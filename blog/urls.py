from django.urls import path , re_path
from django.contrib import admin
from . import views



urlpatterns = [
    path("admin/", admin.site.urls),
    re_path(r"^api/minPosts/$", views.minPostsList),
    re_path(r"^api/lastMinPosts/$", views.lastMinStudents),
    re_path(r"^api/post/([0-9]+)$", views.postDetail),
    re_path(r"^api/comments/$", views.commentsList),
    re_path(r"^api/tags/$", views.tagsList)
    

] 