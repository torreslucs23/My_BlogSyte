from django.shortcuts import render, get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import *
from .models import Post, Tag, Comment, Author

from django.views.generic import DetailView
from django.views.generic import ListView
from django.views import View
from django.http import HttpResponseRedirect
from django.urls import reverse

from django.http import HttpResponse

from .forms import CommentForm


#def get_date(post):
 #   return post.get("date")

# Create your views here.

@api_view(['GET'])
def minPostsList(request):
    if request.method == 'GET':
        data = Post.objects.all()

        serializer = PostSerializers(data, context = {'request': request}, many = True)

        print(serializer.data[0])

        return Response(serializer.data)
    
@api_view(['GET'])
def tagsList(request):
    if request.method == 'GET':
        data = Tag.objects.all()

        serializer = TagSerializers(data, context = {'request': request}, many = True)

        return Response(serializer.data)



'''
class starting_page(ListView):
    template_name = "blog/index.html"
    model =  Post
    ordering = ["-date"]
    context_object_name = "posts"

    def get_queryset(self):
        queryset = super().get_queryset()
        data = queryset[:3][::-1]
        return data

class posts(ListView):
    template_name = "blog/index.html"
    model =  Post
    ordering = ["-date"]
    context_object_name = "posts"

    def get_queryset(self):
        queryset = super().get_queryset()
        data = queryset
        return data



class post_detail(View):
    def is_stored_post(self, request, post_id):
        stored_posts = request.session.get('stored_posts')
        if stored_posts is not None:
            is_saved_for_later = post_id in stored_posts
        else:
            is_saved_for_later = False

        return is_saved_for_later

    def get(self, request, slug):
        post = Post.objects.get(slug = slug)
        
        context = {
            "post":post,
            "post_tags": post.tags.all(),
            "comment_form":CommentForm(),
            "comments": post.comments.all().order_by('-id'),
            "saved_for_later": self.is_stored_post(request, post.id)
        }
        return render(request, "blog/post-detail.html", context)
    
    def post(self, request, slug):
        comment_form = CommentForm(request.POST)
        post = Post.objects.get(slug = slug)
        if comment_form.is_valid():
            comment = comment_form.save(commit = False)
            comment.post = post
            comment.save()

            return HttpResponseRedirect(reverse('post-detail-page', args=[slug]))
        
        context = {
            "post":post,
            "post_tags": post.tags.all(),
            "comment_form":comment_form,
            "comments": post.comments.all().order_by('-id'),
            "saved_for_later": self.is_stored_post(request, post.id)
        }
        return render(request, 'blog/post-detail.html', context)

class ReadLaterView(View):
    def get(self, request):
        stored_posts = request.session.get("stored_posts")
        context = {}
        if stored_posts is None or len(stored_posts) == 0:
            context["posts"] = []
            context["has_post"] = False
        else:
            posts = Post.objects.filter(id__in=stored_posts)
            context["posts"] = posts
            context["has_post"] = True

        return render(request, "blog/stored-posts.html", context)

    def post(self, request):
        stored_posts = request.session.get("stored_posts")

        if stored_posts is None:
            stored_posts = []
        
        post_id = int(request.POST['post_id'])

        if post_id not in stored_posts:
            stored_posts.append(post_id)
            

        else:
            stored_posts.remove(post_id)

        request.session['stored_posts'] = stored_posts

        
        return HttpResponseRedirect('/')

        
'''



