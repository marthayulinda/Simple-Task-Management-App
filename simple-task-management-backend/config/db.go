package config

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	var err error
	connStr := "host=localhost port=5432 user=postgres password=root dbname=simpletask_moonlay sslmode=disable"
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Gagal koneksi ke database:", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal("Tidak dapat ping ke database:", err)
	}

	log.Println("Koneksi ke database berhasil.")
}
