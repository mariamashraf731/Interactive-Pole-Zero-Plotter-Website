from scipy import signal
import matplotlib.pyplot as plt
import numpy as np
import math

z = np.array([])
p = np.array([])

def plot_mag(w,h):
    plt.figure(1)
    plt.title('Digital filter magnitude response')

    plt.plot(w, h , 'b') # w -> 0:pi in rad
    plt.ylabel('Amplitude [dB]', color='b')
    plt.xlabel('w')
    plt.grid()
    #plt.savefig('./static/mag.png')

    

def plot_phase(w,h):
    plt.figure(2)
    plt.title('Digital filter phase response')
    angles = np.angle(h)
    plt.plot(w, angles, 'g')
    plt.ylabel('Angle [radians]', color='g')
    plt.xlabel('w')
    plt.grid()
    #plt.savefig('./static/phase.png')


def filter(z,p):

    w, h = signal.freqz_zpk(z, p, k=1, worN=[0,np.pi/4,np.pi/2,3*np.pi/4,np.pi] ) # w -> 0:pi in rad
    phase=np.angle(h)
    h= np.abs(h)
    plot_mag(w,h)
    plot_phase(w,h)
    plt.show
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


filter(z,p)
