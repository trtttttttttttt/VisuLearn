## Inspiration

Having been a student during COVID-19 for the past 8-months, I can tell you that digital education has not evolved to the point where students can effectively learn. For nearly all of our  classes, teachers utilize PowerPoint as if it is the only option around. Even my younger brother in elementary school learns through PowerPoint.

For Qode Internet Fest, we wanted to create a novel way to brings back that excitement associated with learning. That's how we came up with VisuLearn, a Tensorflow.js based gesture recognition interface that brings augmented reality to digital classrooms with a simple, and user friendly interface.

## What it does

VisuLearn uses a Tensorflow.js based model called Handpose in order to detect the location of fingers in the hand. Our program is able to detect gestures made by the users (based off of algorithms we developed over the course of this hackathon) and accordingly display 3D models, images, and text straight to a Zoom canvas. This lets teachers bring their digital classrooms to life with augmented reality; for example, they can display a 3D rotating model of Jupiter straight to their screen for the whole class to see, or perhaps a model of an organic molecule to increase understanding of subject matter. Additionally, VisuLearn contains a built-in series of text and image aids for students with disabilities. We wanted to increase accessibility in digital classrooms with our project; now, upon activating specific gestures, mute or deaf students can effectively communicate with their peers with images, and custom text; for example "I understand" or "I need help" can be show on their Zoom screen via specific gestures.

## How we built it

VisuLearn was built using JavaScript, Tensorflow.js, p5.js for video feed integration and drawing of models on the video screen, and ml5.js to easily port over Tensorflow.js models to our project. Using positional data of the fingers, VisuLearn is able to detect gestures and accordingly cycle between various images and text that the user uploads to the program. The user can upload custom images, GIFs, or 3D models by simply dragging and dropping them on top of the Canvas. We use a virtual camera software in order to link our program video output feed to the input feed of Zoom, effectively allowing everyone in the class to see all of the magical stuff that happens through our program.

## Challenges we ran into

We ran into many challenges coding the algorithms for gesture detection. There were lots of small nuances with the Handpose Tensorflow.js model that we had to work around in our code in order to successfully implement this program. We also had some problems creating the ability to upload images, and switch between images.


## Accomplishments that we're proud of

We're proud that we were able to finish this relatively complicated project within the allocated time limit. Additionally, we're really glad that we were able to include functionalities that allow for greater accessibility in online education for our fellow peers. 

## What we learned

We learned a lot about the Handpose Tensorflow.js model, virtual camera systems, and good tips and practices for developing algorithms that work on top of pre-trained machine learning models. Qode Internet Fest was a great experience overall, and we certainly had a fun time working on our project!

## What's next for VisuLearn

There is definitely room for improvement for VisuLearn. I think one of the most immediate things that we can do is program our own virtual camera system to remove dependence on OBS. However, this would have likely taken longer to implement than time we had available for this hackathon. Additionally, we want to add more gesture recognition functions to our algorithm in order to increase the customizability of this program even further.

## Links to try the project out

https://visulearn-final.rishabhsahoo.repl.co/
