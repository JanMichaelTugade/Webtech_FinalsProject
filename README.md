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
1. Run Wamp Server and Import the SQL file name of the database as modelm
2. Go to the root directory of the project, then go to the admin folder then, type cmd, then type npm start.
3. To access the admin, type localhost:3000/login
4. To setup the live streaming, go to the root directory of the project then, go to cms > php type cmd, then type php webSocket_server.php; this starts the WebSocket which the live stream will utilize
5. Access the project through the browser by typing localhost/modelm-final


## How to Setup The project on a Virtual Machine
1. Import the appliance then change the network settings to bridged adaptor, then start
2. After the VM has loaded, log in using the credentials, login:user password:user
3. then type hostname -I to see your current IP
4. then after go and edit the IP address placed on the web sockets on livestream.js and viewer.js present on the code
5. restart the server then it should be good to go

## Additional steps if live stream is not working on the Virtual Machine
1. If the live stream is not working, you can access this website on any browser: chrome://flags/#unsafely-treat-insecure-origin-as-secure
2. Then in the textfield, type this: http://ip-address/modelm-final/cms/ NOTE: replace the ip-address with the ip address of the VM
3. Then afterwards you can access the project through simply typing the ip address or also this http://ip-address/modelm-final/cms/

## Flow of the Project
### Viewer
>  watch videos and live streams and can adjust volume 

### Content Manager
1. Upload Video 
2. Add Video To the Queue 
3. Set Start Time and End Time 
4. After doing the steps above, video's added to the queue will then automatically play in order
5. To start a live stream, the content manager can just click on start live and it will ask permission to open the camera 
6. To end the live stream just simply click on end live and it will resume on playing the queued videos
7. View history logs 

### Admin
1. Add users 
2. Edit users information
3. Remove users
4. See user logs 




