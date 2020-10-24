const express = require("express");
const app = express();
const bodyParser = require('body-parser'); 

//Middlewares;
app.use(bodyParser.json());


const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];


// GET Requests
app.get("/", function (req, res) {
  res.send("Hello this is the API for Beyonce Albums");
});

app.get ("/songs", (req,res)=>{
    let newArray = albumsData.map((s)=>s.collectionName);
    newArray.push("Hello World");
    res.send(newArray);
})

app.get("/albums", function (req, res) {
  res.send(albumsData);
});

// GET with parameters;
app.get("/albums/:id", function (req, res) {
    const {id} = req.params;
    let idList = albumsData.find((album)=> album.albumId == id);

    if(!idList) {
        res.send("There is no corresponding")
    } else
    res.send(idList);
});

// POST requests
app.post("/albums/albumAdd", function (req, res) {
  const newAlbum = req.body;
 
  if(newAlbum !== {} ){
      albumsData.push(newAlbum);
      res.json({ success: true });
  } else (res.send('Bad request'));
  
});

//Updating the album
app.post("/albums/albumUpdate/:id", function (req, res) {
  let {id} = req.params;
  const values  = req.body;

  albumsData.forEach((e)=>{
    if(id === e.albumId){
      e.collectionName = values.collectionName; 
  }});
  res.send(albumsData);
});

// Deleting the album
app.delete("/albums/deleteAlbum/:id", function (req, res) {
  let {id} = req.params;

  albumsData.forEach((e)=> {
    if(id === e.albumId){
    albumsData.splice(e,1);
    }});

  res.send("Album deleted");
  });

app.listen(3000, ()=> console.log("Server is working"));