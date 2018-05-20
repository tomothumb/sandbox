package main

import (
	"github.com/therecipe/qt/widgets"
	"os"
)

func main()  {
	app := widgets.NewQApplication(len(os.Args), os.Args)
	window := widgets.NewQMainWindow(nil,0)
	window.SetWindowTitle("Hello World Example")
	window.SetMinimumSize2(200,200)
	layout := widgets.NewQVBoxLayout()

	mainWidget := widgets.NewQWidget(nil,0)
	mainWidget.SetLayout(layout)

	window.SetCentralWidget(mainWidget)
	window.Show()

	app.Exec()

	//window := widgets.NewQMainWindow(nil,0)
	//window.SetWindowTitle("Hello World Exsample")
	//window.SetMinimumSize2(200,200)
	//layout := widgets.NewQVBoxLayout()
	//
	//mainWidget := widgets.N

}
