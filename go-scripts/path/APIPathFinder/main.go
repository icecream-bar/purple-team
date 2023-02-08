package main

import (
	"bufio"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"os"
	"regexp"
)

type Data struct {
	Records []Output `json:"records"`
}

type Output struct {
	Method   string `json:"method"`
	Endpoint string `json:"endpoint"`
}

func jsonFile(method, api string) error {
	var data Data

	// Open the file for reading
	file, err := os.Open("data.json")
	if err != nil {
		// If the file doesn't exist, create a new empty data structure
		data := Data{}
		data.Records = []Output{}
	} else {
		// Read the existing data from the file
		decoder := json.NewDecoder(file)
		err := decoder.Decode(&data)
		if err != nil {
			// Handle error
		}
		defer file.Close()
	}

	// Append the new data to the existing data structure
	newOutput := Output{Method: method, Endpoint: api}
	data.Records = append(data.Records, newOutput)

	// Open the file for writing
	file, err = os.Create("data.json")
	if err != nil {
		// Handle error
		return err
	}
	defer file.Close()

	// Encode the data structure back into JSON format and write it to the file
	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	err = encoder.Encode(data)
	if err != nil {
		// Handle error
		return err
	}
	return nil
}

func main() {
	var testMode bool
	flag.BoolVar(&testMode, "test", false, "test the admin endpoints (e.g: APIPathFinder -test project-name admin-url)")

	var listMode bool
	flag.BoolVar(&listMode, "list", false, "list available endpoints (e.g: APIPathFinder -list fury-project-name)")

	flag.Parse()

	if listMode {
		furyProject := flag.Arg(0)
		err := getEndpoints(furyProject)
		if err != nil {
			fmt.Fprintf(os.Stderr, "%s\n", err)
		}
		return
	}

}

func getEndpoints(furyProject string) error {

	if furyProject == "" {
		return errors.New("fury-project-name cannot be empty")
	}

	// Read the file
	file, err := os.Open(furyProject + "/index.js")
	if err != nil {
		return fmt.Errorf("failed to locate index.js in project directory: %s", err)
	}
	defer file.Close()

	// Read the file
	file2, err := os.Open(furyProject + "/api/index.js")
	if err != nil {
		return fmt.Errorf("failed to locate /api/index.js in project directory: %s", err)
	}
	defer file2.Close()

	// Compile the regular expression
	re := regexp.MustCompile(`(const\sapi)\s\=\s(require\(\')(\.\/api)`)
	re2 := regexp.MustCompile(`router\.use\(\'(.*)\', (.*)\);`)
	re3 := regexp.MustCompile(`router\.get\(\'(.*)\'.*`)
	re4 := regexp.MustCompile(`router\.post\(\'(.*)\'.*`)
	re5 := regexp.MustCompile(`router\.put\(\'(.*)\'.*`)
	re6 := regexp.MustCompile(`router\.head\(\'(.*)\'.*`)
	re7 := regexp.MustCompile(`router\.delete\(\'(.*)\'.*`)

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
					endpoint := furyProject + "/api/handlers/" + match[2] + ".js"
					// Read the file
					file3, err := os.Open(endpoint)
					if err != nil {
						return fmt.Errorf("failed to locate /api/handlers in project directory: %s", err)
					}
					defer file.Close()
					scanner3 := bufio.NewScanner(file3)
					for scanner3.Scan() {
						line := scanner3.Text()

						// Check if the pattern matches the current line
						if match := re3.FindStringSubmatch(line); match != nil {
							api := api + match[1]
							fmt.Println("method GET: " + api)
							method := "GET"
							err := jsonFile(method, api)
							if err != nil {
								fmt.Fprintf(os.Stderr, "%s\n", err)
							}
						}
						// Check if the pattern matches the current line
						if match := re4.FindStringSubmatch(line); match != nil {
							api := api + match[1]
							fmt.Println("method POST: " + api)
							method := "POST"
							err := jsonFile(method, api)
							if err != nil {
								fmt.Fprintf(os.Stderr, "%s\n", err)
							}
						}
						// Check if the pattern matches the current line
						if match := re5.FindStringSubmatch(line); match != nil {
							api := api + match[1]
							fmt.Println("method PUT: " + api)
							method := "PUT"
							err := jsonFile(method, api)
							if err != nil {
								fmt.Fprintf(os.Stderr, "%s\n", err)
							}
						}
						// Check if the pattern matches the current line
						if match := re6.FindStringSubmatch(line); match != nil {
							api := api + match[1]
							fmt.Println("method HEAD: " + api)
							method := "HEAD"
							err := jsonFile(method, api)
							if err != nil {
								fmt.Fprintf(os.Stderr, "%s\n", err)
							}
						}
						// Check if the pattern matches the current line
						if match := re7.FindStringSubmatch(line); match != nil {
							api := api + match[1]
							fmt.Println("method DELETE: " + api)
							method := "DELETE"
							err := jsonFile(method, api)
							if err != nil {
								fmt.Fprintf(os.Stderr, "%s\n", err)
							}
						}
					}
				}
			}
		}
	}

	// Check for errors during scanning
	if err := scanner.Err(); err != nil {
		return fmt.Errorf("Error scanning project directory: %s", err)
	}
	return nil
}
