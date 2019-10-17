import 'package:first_project/CCList.dart';
import 'package:flutter/material.dart';

void main() => runApp(CCapp());

class CCapp extends StatelessWidget{

  @override
  Widget build(BuildContext ctx){
    return MaterialApp(
      title: "Курсы криптовалют",
      theme: ThemeData(
        primarySwatch: Colors.deepOrange
      ),
      home: CCList()
    );
  }
}