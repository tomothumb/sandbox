package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"github.com/fatih/color"
	"log"
	"strconv"
)

func init() {
	rootCmd.AddCommand(sumCmd)
}

var sumCmd = &cobra.Command {
	Use: "sum",
	Short: "sum culc",
	Args: cobra.RangeArgs(2,2),
	Run: func(cmd *cobra.Command, args []string) {
		if len(args) == 0 {
			return
		}

		itemOne, err := strconv.Atoi(args[0])
		if err != nil {
			log.Fatal(err)
			return
		}
		itemTwo, err := strconv.Atoi(args[1])
		if err != nil {
			log.Fatal(err)
			return
		}

		green := color.New(color.FgGreen).SprintFunc()
		fmt.Println(green(itemOne + itemTwo))

		return
	},
}