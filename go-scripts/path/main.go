package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
)

func main() {
	// Compile the regular expression patterns
	usePattern := regexp.MustCompile(`router\.use\(\'(.*)\', (.*)\);`)
	getPattern := regexp.MustCompile(`router\.get\(\'(.*)\'.*`)

	// Walk the file tree starting from the current directory
	filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Skip directories
		if info.IsDir() {
			return nil
		}

		// Open the file
		file, err := os.Open(path)
		if err != nil {
			return err
		}
		defer file.Close()

		// Read the file line by line
		scanner := bufio.NewScanner(file)
		for scanner.Scan() {
			line := scanner.Text()

			// Check if the line matches the "router.use('...', ...);" pattern
			if matches := usePattern.FindStringSubmatch(line); len(matches) > 1 {
				//fmt.Println(path + ": router.use(" + matches[1] + ", " + matches[2] + ")")
				fmt.Println(path + " " + matches[2] + ".js")
			}

			// Check if the line matches the "router.get('...')" pattern
			if matches := getPattern.FindStringSubmatch(line); len(matches) > 1 {
				//fmt.Println(path + ": router.get(" + matches[1] + ")")
				//fmt.Println(matches[1])
			}
		}

		if err := scanner.Err(); err != nil {
			return err
		}

		return nil
	})
}
