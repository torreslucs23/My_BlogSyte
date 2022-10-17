from django.shortcuts import render
from datetime import  date


all_posts =[
    {
        "slug" : "hike-in-mountains",
        "author" : "Lucas",
        "image" :  "montanhas.jpg",
        "date" : date(2022,10,17),
        "title" : "Mountain Hiking", 
        "excerpt" : 
        """ There's nothing like the views you get when hiking in the mountains!  
            And i wasn't even prepared for what hapenned whilist i was
            enjoying the view!""",
        "content" :
        """The origin of mountains (orogenesis) occurs after tectonic movements make rock 
            layers fold and overlap. All the Earth's surface, the lithosphere, is divided 
            into rigid areas called continental plates and oceanic plates. These lithospheric plates 
            continuously move and whenever they bump into each other, they form mountain chains.
        """
    },
    {
        "slug" : "coding-clojure",
        "author" : "Lucas",
        "image" :  "Clojure_logo.png",
        "date" : date(2022,10,17),
        "title" : "Clojure Intro", 
        "excerpt" : 
        """ A new concept of programming it's comming!! Clojure use functional
            method to work in codes!!!
        """,
        "content" :
        """
            Clojure is a dynamic, general-purpose programming language, combining the approachability 
            and interactive development of a scripting language with an efficient and robust 
            infrastructure for multithreaded programming. Clojure is a compiled language, yet remains 
            completely dynamic – every feature supported by Clojure is supported at runtime. Clojure 
            provides easy access to the Java frameworks, with optional type hints and type 
            inference, to ensure that calls to Java can avoid reflection.
        """
    }
]

def get_date(post):
    return post.get("date")

# Create your views here.

def starting_page(request):
    sorted_posts = sorted(all_posts,key = get_date) #sort the posts list by the key DATE
    latest_posts = sorted_posts[-2:] #take the last 3 posts to show in the starting page
    return render(request,"blog/index.html", {
        "posts" : latest_posts
    })

def posts(request):
    return render(request, "blog/all-posts.html",{
        "allposts" : all_posts
    })

def post_detail(request, slug):
    identified_post = next(post for post in all_posts if post['slug'] == slug)
    return render(request, "blog/post-detail.html", {
        "post" : identified_post
    })