from rest_framework import serializers
from .models import Post, Author, Comment, Tag

class AuthorSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Author
        fields = ('first_name', 'last_name','email')


class TagSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Tag
        fields = ('caption')

class PostsSerializers(serializers.ModelSerializer):

    author = AuthorSerializers(read_only = True)
    tags = TagSerializers(read_only = True)

    class Meta:
        model = Post
        fields = ('title', 'excerpt', 'image', 'date','slug','content','author','tags')


class CommentSerializers(serializers.ModelSerializer):

    post = PostsSerializers(read_only = True)
    
    class Meta:
        model = Comment
        fields = ('name, user_email','text', 'post')

