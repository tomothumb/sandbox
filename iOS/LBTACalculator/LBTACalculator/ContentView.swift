//
//  ContentView.swift
//  LBTACalculator
//
//  Created by Tomoyuki Tsujimoto on 2020/11/15.
//

import SwiftUI

enum CalculatorButton: String {
    case zero, one, two,three, four, five, six, seven, eight, nine
    case equal, plus, minus, multiply, divide
    case ac, plusMinus, percent
    case equals, decimal
    
    var title: String {
        switch self {
        case .zero: return "0"
        case .one: return "1"
        case .two: return "2"
        case .three: return "3"
        case .four: return "4"
        case .five: return "5"
        case .six: return "6"
        case .seven: return "7"
        case .eight: return "8"
        case .nine: return "9"
        case .ac: return "AC"
        case .plusMinus: return "+/-"
        case .percent: return "%"
        case .divide: return "/"
        case .plus: return "+"
        case .minus: return "-"
        case .multiply: return "X"
        case .equals: return "="
        case .decimal: return "."
            
        default:
        
            return "AC"
        }
    }
    
    var backgroundColor: Color {
        switch self {
        case .zero, .one, .two, .three, .four, .five, .six, .seven, .eight, .nine:
            return Color(.darkGray)
        case .ac, .plusMinus,.percent,.divide:
            return Color(.lightGray)
        default:
            return .orange
        }
    }
}

// Env object
// You can treat this as the Global Application State
class GlobalEnvironment: ObservableObject {
    
    @Published var display = "0"
    
    func receiveInput(calculatorButton: CalculatorButton){
        self.display = calculatorButton.title
    }
    
}

struct ContentView: View {
    
    @EnvironmentObject var env: GlobalEnvironment
    
    let buttons:[[CalculatorButton]] = [
        [.ac, .plusMinus,.percent, .divide],
        [.seven,.eight,.nine,.multiply],
        [.four,.five,.six,.minus],
        [.one,.two,.three,.plus],
        [.zero,.decimal,.equals],
    ]
//    let buttons = [
//        ["7","8","9","X"],
//        ["4","5","6","-"],
//        ["1","2","3","+"],
//        ["0",".",",","="]
//    ]
    
    var body: some View {
        
        ZStack (alignment: .bottom) {
            Color.black.edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 12 ){
                HStack{
                    Spacer()
                    Text(env.display).foregroundColor(.white)
                        .font(.system(size:72))
                }.padding()
                
                
                ForEach(buttons, id: \.self) { row in
                    HStack(spacing: 12){
                        ForEach(row, id: \.self) { button in
                            
                            Button(action: {
                                self.env.receiveInput(calculatorButton: button)

                            }) {
                                Text(button.title)
                                    .font(.system(size: 32))
                                    .frame(
                                        width:self.buttonWidth(button: button),
                                        height: (UIScreen.main.bounds.width - 5 * 12) / 4
                                    )
                                    .foregroundColor(.white)
                                    .background(button.backgroundColor)
                                    .cornerRadius(self.buttonWidth(button: button))
                            }
                            
                            
                        }
                    }
                }
            }.padding(.bottom)
        }
    }
    
    func buttonWidth(button: CalculatorButton) -> CGFloat {
        if button == .zero {
            return ((UIScreen.main.bounds.width - 5 * 12) / 4 * 2) + 12
        }
        return (UIScreen.main.bounds.width - 5 * 12) / 4
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView().environmentObject(GlobalEnvironment())
    }
}
