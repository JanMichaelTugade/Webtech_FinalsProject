# Webtech_FinalsProject 
## Team members
> Jesse Daniel Buenaventura  
> Greg Anthony Bangyay  
> Earl Jems Constantino  
> Ron Carlo Saludares  
> Helaena Mhaecaika Tadina  
> Jan Michael Tugade   

## Video Streaming Platform
### UI's:
> Viewer  
> Content Manager  
> Admin  

## How to Setup The project on local
> Run Wamp Server and Import the sql file name the database as modelm
> Go to the root directory of the project then go to the admin folder then type cmd then type npm start
> To access the admin just type localhost:3000/login
> To setup the live streaming go to the root directory of the project then go to cms > php then type cmd then type php webSocket_server.php this starts the websocket which the livestream will utilize
> Access the project through the browser by typing localhost/modelm-final 

## How to Setup The project on Virtual Machine
> Import the appliance then change the network settings to bridged adaptor then start
> After the VM has loaded login using the credentials user, user
> then type hostname -I to see your current IP
> then after go and edit the ip address placed on the websockets on livestream.js and viewer.js present on the code
> restart the server then it should be good to go

## Flow of the Project
### Viewer
>  watch videos and live streams and can adjust volume 

### Content Manager
> Upload Video 
> Add Video To the Queue 
> Set Start Time and End Time 
> After doing the steps above video's added to the queue will then automatically play in order
> To start a live stream the content manager can just click on start live and it will ask permission to open the camera 
> To end the live stream just simply click on end live and it will resume on playing the queued videos
> View history logs 

### Admin
> Add users 
> Edit users information
> Remove users
> See user logs 




