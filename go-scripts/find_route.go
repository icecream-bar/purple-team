package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	// Compile the regular expression pattern
	pattern := regexp.MustCompile(`router\.use\(\'(.*)\'.*`)

	// Open the file
	file, err := os.Open("file.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Read the file line by line
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		// Check if the line matches the pattern
		if matches := pattern.FindStringSubmatch(line); len(matches) > 1 {
			fmt.Println(matches[1])
		}
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}
}
