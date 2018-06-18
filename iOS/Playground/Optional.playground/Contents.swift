//: Playground - noun: a place where people can play

import UIKit

// #link
// https://qiita.com/maiki055/items/b24378a3707bd35a31a8

var val1_1: String
var val1_2: String?
var val1_3: String!
//`print(val1_1)  // ERROR
print(val1_2)
print(1_3)

var val2_1: String = "Hello World 1"
var val2_2: String? = "Hello World 1"
var val2_3: String! = "Hello World 1"
print(val2_1)
print(val2_2)
print(val2_3)


var val3_1: String
var val3_2: String?
var val3_3: String!
//val3_1 = nil // ERROR
val3_2 = nil
val3_3 = nil
//print(val3_1) // ERROR
print(val3_2)
print(val3_3)

var val4_1: Int
var val4_2: Int?
var val4_3: Int!
//val4_1 = nil // ERROR
val4_2 = nil
val4_3 = nil
//print(val4_1) // ERROR
print(val4_2)
print(val4_3)


// Forced Unwrapping
var val5_1: Int = 10
var val5_2: Int? = 20
var val5_3: Int! = 30
print(val5_1)
print(val5_2)
print(val5_2!)
print(val5_3)
//print(val5_1 + val5_2) // ERROR
print(val5_1 + val5_2!)
print(val5_1 + val5_3)

var val6_1: Int?
print(val6_1)
// print(val6_1!) // ERROR

// Optional Binding
var val7_1: String?
if let unwrappedValue7_1 = val7_1 {
    print(unwrappedValue7_1)
}else{
    print("nilです")
}

var val8_1: String? = "Initial Value"
if let unwrappedValue8_1 = val8_1 {
    print(unwrappedValue8_1)
}else{
    print("nilです")
}


// Optional Chaining
//var human: Human? = Human()
//human?.name
//human?.hello()
//
//// Optional Chaining
//var human_nil: Human?
//human_nil?.name
//human_nil?.hello()

