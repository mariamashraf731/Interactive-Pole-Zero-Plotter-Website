from flask import Flask, render_template , request , jsonify 
# from filter import filter
import numpy as np
import json 
from scipy import signal
import numpy as np


def filter(z,p):
    w, h = signal.freqz_zpk(z, p, k=1, worN=[0,np.pi/4,np.pi/2,3*np.pi/4,np.pi] ) 
    phase=np.angle(h)
    h= np.abs(h)
    return h,phase

   
def all_pass(z, p, a):

    w, h_filter = signal.freqz_zpk(z, p, k=1 ) #the original filter
    h_total = h_filter
    for filter in a:
        num = [0, filter]
        den = [filter, 0]
        wp, h_pass = signal.freqz(num, den) #all pass filter

        #cascading filters by multiplying the freq responses
        h_total *= h_pass 
    
    phase=np.angle(h_total)
    h= np.abs(h_total)
    return h,phase

app = Flask(__name__)
z = np.array([1j])
p = np.array([])
all_pass=np.array([])

# global zeros
zeros=np.array([])
poles=np.array([])
h = np.array([])
h_past = np.array([])
phases=[]
values=[]
f = 1

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route("/arrays",methods=['POST','GET'])
def arrays():
    global zeros
    zeros = np.array([])
    global poles
    poles=np.array([])
    all_pass=np.array([])
    req = request.get_json()
    for i in range(len(req["z"])):
        z = complex(round((req["z"][i]['x']-300)/150,2),-1*round((req["z"][i]['y']-300)/150,2))
        zeros = np.append(zeros ,z)

    for i in range(len(req["p"])):
        p = complex(round((req["p"][i]['x']-300)/150,2),-1*round((req["p"][i]['y']-300)/150,2))
        poles = np.append(poles ,p)
    global h
    h , phase = filter(zeros,poles)
    print(zeros)
    global values
    values = h.tolist()
    global phases
    phases = phase.tolist()
    global f
    f=0

    return ""

@app.route("/get_data")
def get_data():
    h_ , phase = filter(zeros,poles)
    x = 0
    global h_past 
    if  not np.array_equal(h_ ,h_past):
        x = 1
        h_past = h_    
    return jsonify({'payload':json.dumps({'data':values,'p':phases,'x':x ,'f':f})})

if __name__ == '__main__':
    app.run()