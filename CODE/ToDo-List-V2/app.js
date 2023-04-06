const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

const itemsSchema = new mongoose.Schema({
  name: {
    type: String
  }
});
const Item = mongoose.model("Item", itemsSchema);

const listSchema = new mongoose.Schema({
  name: {
    type: String
  },
  items: [itemsSchema]
});
const List = mongoose.model("List", listSchema);


const byfd = new Item({
  name: 'Buy Food'
});
const ckfd = new Item({
  name: 'Cook Food'
});
const etfd = new Item({
  name: 'Eat Food'
});
const defaultItems = [byfd, ckfd, etfd];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  Item.find({}).then(function (foundItems) {
    if(foundItems.length === 0){
      Item.insertMany(defaultItems);
      return res.redirect('/');
    }
    res.render("list", {listTitle: 'Today', newListItems: foundItems});
  });
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const itemM = new Item({
    name: itemName
  });
  if(listName === 'Today'){
    itemM.save();
    res.redirect("/");
  }
  else{
    List.find({name: listName}).then(function (foundLists) {
      foundLists[0].items.push(itemM);
      foundLists[0].save();
      res.redirect('/' + listName);
    });
  }
});

app.post('/delete', function(req, res){
  if(req.body.listName === 'Today'){
    Item.deleteOne({_id: req.body.checkbox}).then(function(){
      res.redirect('/');
    });
  }
  else{
    List.findOneAndUpdate({name: req.body.listName}, {$pull: {items: {_id: req.body.checkbox}}}).then();
    res.redirect('/' + req.body.listName);
  }
});

app.get('/:customListName', function (req, res) {
  const customListName = req.params.customListName;
  List.find({name: customListName}).then(function (foundLists) {
    if(foundLists.length === 0){
      const list = new List({
        name: customListName,
        items: defaultItems
      });
      list.save();
      res.redirect('/' + customListName);
    }
    else{
      if(foundLists[0].items.length === 0){
        List.findOneAndUpdate({name: customListName}, {items: defaultItems}).then();
        res.redirect('/' + customListName);
      }
      else{
        res.render("list", {listTitle: customListName, newListItems: foundLists[0].items});
      }
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
