//
//  GridSampleTests.swift
//  GridSampleTests
//
//  Created by Tomoyuki Tsujimoto on 2019/02/17.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import XCTest
@testable import GridSample

class GridSampleTests: XCTestCase {

    func testHelloWorld(){
        var helloWorld: String?
        XCTAssertNil(helloWorld)
        
        helloWorld = "hello world"
        XCTAssertEqual(helloWorld, "hello world")
        
    }
//
//    override func setUp() {
//        // Put setup code here. This method is called before the invocation of each test method in the class.
//    }
//
//    override func tearDown() {
//        // Put teardown code here. This method is called after the invocation of each test method in the class.
//    }
//
//    func testExample() {
//        // This is an example of a functional test case.
//        // Use XCTAssert and related functions to verify your tests produce the correct results.
//    }
//
//    func testPerformanceExample() {
//        // This is an example of a performance test case.
//        self.measure {
//            // Put the code you want to measure the time of here.
//        }
//    }

}
