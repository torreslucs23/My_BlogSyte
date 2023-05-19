from rest_framework import serializers
from .models import Post, Author, Comment, Tag
from .serializers import UserSerializer

class PostSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only = True)

    class Meta:
        model = Post
        fields = ('title', 'excerpt', 'image', 'date','slug','content','author','tags')

class AuthorSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Author
        fields = ('first_name', 'last_name','email')

class TagSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Tag
        fields = ('caption')

class CommentSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = ('name, user_email','text', 'post')

