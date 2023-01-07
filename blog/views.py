from django.shortcuts import render, get_object_or_404

from .models import Post

from django.views.generic import DetailView
from django.views.generic import ListView

from .forms import CommentForm


def get_date(post):
    return post.get("date")

# Create your views here.

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

class post_detail(DetailView):
    template_name = "blog/post-detail.html"
    model = Post

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["post_tags"] = self.object.tags.all()
        context["comment_form"] = CommentForm()
        return context
    

