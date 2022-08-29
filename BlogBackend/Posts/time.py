import datetime
from pdb import pm
from time import time
# from .models import Post

# post = Post.objects.get(id='id56e0849c-eb08-478c-996f-78440ecea742')
# timenow = datetime.now()
# time = datetime.now()
# print(post)


def timing(saveTime):

    pH = int(saveTime.strftime("%H"))
    pM = int(saveTime.strftime("%M"))
    pS = int(saveTime.strftime("%S"))


    curr_time = datetime.datetime.now().time() # Current Time
    # print(curr_time) 
    dt_obj = datetime.time(pH, pM)
   
   
    # Now Calculate the difference
    diff = datetime.timedelta(hours=(curr_time.hour - dt_obj.hour))
    seconds = diff.total_seconds()

   
    # if diff..strftime("%H")
    return seconds
    
#  current.strftime("%Y-%m-%d %H:%M:%S") == saveTime.strftime("%Y-%m-%d %H:%M:%S")
   
