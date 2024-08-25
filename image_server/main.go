package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	directory := os.Getenv("IMAGE_DIRECTORY")

	http.Handle("/", http.FileServer(http.Dir(directory)))

	log.Printf("Serving %s on HTTP port: %s\n", directory, port)
	http.ListenAndServe(":"+port, nil)
}
