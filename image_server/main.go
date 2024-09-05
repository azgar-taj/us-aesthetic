package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	directory := os.Getenv("IMAGE_DIRECTORY")
	fs := http.FileServer(http.Dir(directory))
	http.Handle("/assets/", http.StripPrefix("/assets", fs))
	http.Handle("/uploadImage", http.HandlerFunc(uploadImage))

	log.Printf("Serving %s on HTTP port: %s\n", directory, port)
	http.ListenAndServe(":"+port, nil)
}

func uploadImage(w http.ResponseWriter, r *http.Request) {
	file, handler, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Failed to read image", http.StatusBadRequest)
		return
	}
	defer file.Close()

	f, err := os.OpenFile(os.Getenv("IMAGE_DIRECTORY")+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		http.Error(w, "Failed to open image", http.StatusInternalServerError)
		return
	}
	defer f.Close()

	_, err = io.Copy(f, file)
	if err != nil {
		http.Error(w, "Failed to save image", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
