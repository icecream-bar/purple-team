package main

import (
	"fmt"
	"os"

	"github.com/go-git/go-git/v5"
)

func main() {
	fmt.Print("Enter Admin-fe repo name : ")
	var repo string
	fmt.Scanln(&repo)
	repoURL := "https://github.com/mercadolibre/" + repo

	// Clone the repository
	_, err := git.PlainClone("./repo", false, &git.CloneOptions{
		URL:      repoURL,
		Progress: os.Stdout,
	})
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Repository cloned successfully.")
}
