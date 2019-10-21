package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(fooCmd)
}

var fooCmd = &cobra.Command {
	Use: "foo",
	Short: "This is sample short description.",
	Long: "This is sample long description.",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("foo")
	},
}