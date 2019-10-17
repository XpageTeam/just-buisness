import 'dart:convert';
import 'package:first_project/CCdata.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class CCList extends StatefulWidget{

  

  @override

  State<StatefulWidget> createState(){
    return CCListState();
  }
}

class CCListState extends State<CCList> {
  List<CCdata> data = [];

  @override
  Widget build (BuildContext ctx){
    return Scaffold(
      appBar: AppBar(
        title: Text("Курс криптовалют"),
      ),
      body: Container(
        child: ListView(
          children: _buildList(),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.refresh),
        onPressed: () => _loadCC(),
      ),
    );
  }

  void _loadCC() async{
    final url = "https://api.coinmarketcap.com/v2/ticker/?limit=100";
    final response = await http.get(url);

    if (response.statusCode == 200){
      var allData = (json.decode(response.body) as Map)["data"] as Map<String, dynamic>;
      print(allData);
      var ccDataList = List<CCdata>();

      allData.forEach((String key, dynamic val){
        var curRecord = CCdata(
          name: val["name"],
          symbol: val["symmbol"],
          rank: val["rank"],
          price: val["quotes"]["USD"]["price"]
        );

        ccDataList.add(curRecord);
      });

      setState(() {
        data = ccDataList; 
      });
    }
  }

  List<Widget> _buildList(){
    return data.map((CCdata object) => ListTile(
      title: Text(object.name),
      subtitle: Text(object.symbol),
      leading: CircleAvatar(
        child: Text(object.rank.toString()),
      ),
      trailing: Text("\$${object.price.toStringAsFixed(2)}"),
    )).toList();
  }

  @override
  void initState() {
    super.initState();

    _loadCC();
  }
}