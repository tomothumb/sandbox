package cmd

import (
	//"fmt"
	"github.com/spf13/cobra"
	"github.com/fatih/color"
	//"log"
	//"strconv"
)

type Options struct {
	one int
	two int
}
var (
	opt = &Options{}
)

func init() {
	rootCmd.AddCommand(sumCmd)
	sumCmd.Flags().IntVarP(&opt.one, "one", "o", 0, "int option1")
	sumCmd.Flags().IntVarP(&opt.two, "two", "t", 0, "int option2")
}

var sumCmd = &cobra.Command {
	Use: "sum",
	Short: "sum culc",
	//Args: cobra.RangeArgs(2,2),
	Run: func(cmd *cobra.Command, args []string) {
		//if len(args) == 0 {
		//	return
		//}

		//itemOne, err := strconv.Atoi(args[0])
		//if err != nil {
		//	log.Fatal(err)
		//	return
		//}
		//itemTwo, err := strconv.Atoi(args[1])
		//if err != nil {
		//	log.Fatal(err)
		//	return
		//}

		green := color.New(color.FgGreen).SprintFunc()
		cmd.Printf(green("sum called: one: %d, two: %d, sum: %d \n"),opt.one, opt.two, opt.one + opt.two)
		//fmt.Printf("sum called: one: %d, two: %d, sum: %d",opt.one, opt.two, opt.one + opt.two)
		//fmt.Println(green(itemOne + itemTwo))

		return
	},
}