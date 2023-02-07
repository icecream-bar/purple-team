package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	// Read the directory location from the user
	fmt.Print("Enter directory location: ")
	var dir string
	fmt.Scanln(&dir)

	// Read the file
	file, err := os.Open(dir + "/index.js")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// Read the file
	file2, err := os.Open(dir + "/api/index.js")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// Compile the regular expression
	re := regexp.MustCompile(`(const\sapi)\s\=\s(require\(\')(\.\/api)`)
	re2 := regexp.MustCompile(`router\.use\(\'(.*)\', (.*)\);`)
	re3 := regexp.MustCompile(`router\.get\(\'(.*)\'.*`)

	// Scan the file line by line
	scanner := bufio.NewScanner(file)
	scanner2 := bufio.NewScanner(file2)
	for scanner.Scan() {
		line := scanner.Text()
		// Check if the pattern matches the current line
		if match := re.FindStringSubmatch(line); match != nil {
			group3 := match[3]
			//fmt.Println(group3)
			for scanner2.Scan() {
				line := scanner2.Text()
				// Check if the pattern matches the current line
				if match := re2.FindStringSubmatch(line); match != nil {
					api := group3 + match[1]
					//fmt.Println(api)
					endpoint := dir + "/api/handlers/" + match[2] + ".js"
					// Read the file
					file3, err := os.Open(endpoint)
					if err != nil {
						fmt.Println("Error opening file:", err)
						return
					}
					defer file.Close()
					scanner3 := bufio.NewScanner(file3)
					for scanner3.Scan() {
						line := scanner3.Text()
						// Check if the pattern matches the current line
						if match := re3.FindStringSubmatch(line); match != nil {
							api := api + match[1]
							fmt.Println(api)
						}
					}
				}
			}
		}
	}

	// Check for errors during scanning
	if err := scanner.Err(); err != nil {
		fmt.Println("Error scanning file:", err)
		return
	}
}
