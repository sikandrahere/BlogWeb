# steps

#  create react app by vite

    1.create react app 

    2. install dependencies:-
      1.redux- for state management
      2.react-router-dom - for routing
      3.appwrite - for use appwrite service
      4.tinymce - for using rich text editor
      5.html-react-parcer - for parse html
      6.hook forms - handle input forms
      7.tailwind css

    3.  make environment variables :-
       - we cant share it as a public so we store it as a private in root directly and project home directly is root directly 

       - we can make a sample env file for share sample env code

  -make conf file for store env and export env
  -sometime env cant be load so we make this file 

   
# APPWRITE

   1.create new project:-
     -get project id
     -get URL

   2.DATAEBASE:-
     -get databaseid

   3.collection:- (articals)
     -in database have multiple collection
     -make collection
     -get collection id

   4.Attiributes:-(titile,content, feature img..):-
     - in collection we can make many attributes  

   5.Index:-(status)
   -in collection it avaible
   -create index

   6.STORAGE:-
   - create bucket(storage)
   - get bucket id 


   <!--  STORE THESE ID IN ENV  -->



# Build authentication service

    1. create appwrite folder 
   
  ##  auth services

      1.create Auth.js file
      2.first create clint and account in auth.js file
      3. create auth services:-
        -login, logout , checkuser

  ## database services

      1.create database.js file 
      2.first create clint and account in database.js file
      3.create database services:-
      -clint , database(works as account),create post , update post,delete post

   ## storage (bucket) sevices

      1.create storage.js file
      2.first create clint and bucket in storage.js file
      3. create storage sevices:-
      -uploadfile, deletefile, get file preview



#  configure redux toolkit

    -create store folder
    - create store.js file for configure store

  ## make authSlice 
     -create slice
     - make 2 reducer- login and logout  

  ### setup provider in main.jsx   

# handle loading in app.jsx


# components

     -  index.js= file for store all component so we can import all component from one file 
     - {logo, button,select } 
     - footer ,
     - header(header, logoutbtn) 
     - container(holds all children)
     - postcard
     - login
     -signup
     -authlayout(works as a container for securty)
     -RTE- rich text editor
     -postform
     -postcard

  # Pages
      -Addpost
      -editpost
      -allpost
      -post
      -home
      -signup
      -login


# Router
    -make router in main.jsx      
     
