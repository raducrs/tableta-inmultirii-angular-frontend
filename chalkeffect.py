# -*- coding: utf-8 -*-
"""
Created on Thu Oct  8 19:02:03 2020

@author: Laura
"""

import cv2
import numpy as np
# read image
src = cv2.imread('test/1.jpg', cv2.IMREAD_GRAYSCALE)

# Resize to TARGET x TARGET in landscape or portrait
TARGET = 512
TARGET_PORTRAIT = 350

org_height = src.shape[0]
org_width = src.shape[1]

scale_percent = 1
landscape = True
if (org_height>org_width):
    scale_percent = TARGET_PORTRAIT  / org_height
    landscape = False
else:
    scale_percent = TARGET / org_width
    resulting_height =  int(src.shape[0] * scale_percent)
    if (resulting_height>TARGET_PORTRAIT):
        scale_percent = TARGET_PORTRAIT  / org_height
        landscape = False
   
# new size    
width = int(src.shape[1] * scale_percent)
height = int(src.shape[0] * scale_percent)
dsize = (width, height)
  
resized = cv2.resize(src, dsize)



# apply guassian blur on src image
dst = cv2.GaussianBlur(resized,(3,3),cv2.BORDER_DEFAULT)
sobelx64f = cv2.Sobel(dst,cv2.CV_8U,1,1,ksize=5)

top_pixel = np.percentile(sobelx64f,97)

saturation = cv2.convertScaleAbs(sobelx64f, alpha=(250/top_pixel), beta=0)
blured = cv2.GaussianBlur(saturation,(3,3),cv2.BORDER_DEFAULT)



 
# display input and output image
# cv2.imshow("Gaussian Smoothing",np.hstack((resized, blured)))
# cv2.waitKey(0) # waits until a key is pressed
# cv2.destroyAllWindows() # destroys the window showing image

#%%
bck = cv2.imread('test/blackboard_wide_2.png', cv2.IMREAD_GRAYSCALE)
beta = 0.5
offset_x = 250
offset_y = 5
for y in range(blured.shape[0]):
    for x in range(blured.shape[1]):
        bck[y+offset_y,x+offset_x] = np.uint8(bck[y+offset_y,x+offset_x]+beta*blured[y,x])
if not landscape:    
    # clip image
    actual_width = 250 + blured.shape[1] + 5
    actual_width = actual_width if actual_width <= 768 else 768
    bck = bck[:,0:actual_width]
    
                    
cv2.imshow("Blackboard Smoothing",bck)
cv2.waitKey(0) # waits until a key is pressed
cv2.destroyAllWindows() 