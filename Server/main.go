package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	elastic "gopkg.in/olivere/elastic.v7"
)

func GetESClient() (*elastic.Client, error) {
	client, err := elastic.NewClient(elastic.SetURL("http://localhost:9200"),
		elastic.SetSniff(false),
		elastic.SetHealthcheck(false))
	//fmt.Println("ES initialized...")
	return client, err
}

//travels details modal
type travel struct {
	Name     string `json:"name"`
	From     string `json:"from"`
	To       string `json:"to"`
	Date     string `json:"date"`
	Rupees   string `json:"rupees"`
	Duration string `json:"duration"`
}
type user struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Gender   string `json:"gender"`
	Houseno  string `json:"houseno"`
	Street   string `json:"street"`
	City     string `json:"city"`
	Pincode  string `json:"pincode"`
	State    string `json:"state"`
	Country  string `json:"country"`
	Phone    string `json:"phone"`
}
type login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type booking struct {
	Name     string         `json:"name"`
	Bookings []bookingarray `json:"bookings"`
}
type bookingarray struct {
	Name       string   `json:"name"`
	From       string   `json:"from"`
	To         string   `json:"to"`
	Date       string   `json:"date"`
	Rupees     string   `json:"rupees"`
	Duration   string   `json:"duration"`
	Seatno     []string `json:"seatno"`
	Passengers []string `json:"passengers"`
}

//users
func getusers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var users []user
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		panic("Client fail ")
	}
	searchSource := elastic.NewSearchSource()
	searchSource.Query(elastic.NewMatchQuery("name", params["name"]))
	queryStr, err1 := searchSource.Source()
	queryJs, err2 := json.Marshal(queryStr)
	if err1 != nil || err2 != nil {
		fmt.Println("[esclient][GetResponse]err during query marshal=", err1, err2, queryJs)
	}
	fmt.Println("[esclient]Final ESQuery=\n", string(queryJs))
	searchService := esclient.Search().Index("users").SearchSource(searchSource)
	ctx := context.Background()
	searchResult, err := searchService.Do(ctx)
	if err != nil {
		fmt.Println("[ProductsES][GetPIds]Error=", err)
		return
	}
	if len(searchResult.Hits.Hits) == 0 {
		fmt.Println("")
		json.NewEncoder(w).Encode("Empty")
		return
	}
	for _, hit := range searchResult.Hits.Hits {
		var ss user
		err := json.Unmarshal(hit.Source, &ss)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}

		users = append(users, ss)
	}
	fmt.Println("Users", users)
	json.NewEncoder(w).Encode(users[0])
}
func addusers(w http.ResponseWriter, r *http.Request) {
	//w.Header().Set("Content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var use user
	_ = json.NewDecoder(r.Body).Decode(&use)
	ctx := context.Background()
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		panic("Client fail ")
	}
	dataJSON, err := json.Marshal(use)
	js := string(dataJSON)
	ind, err := esclient.Index().
		Index("users").
		BodyJson(js).
		Do(ctx)

	if err != nil {
		panic(err)
	}

	fmt.Println("[Elastic][InsertProduct]Insertion Successful", ind)
	json.NewEncoder(w).Encode(use)
}

//travels
func gettravels(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var travels []travel
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		panic("Client fail ")
	}
	searchSource := elastic.NewSearchSource()
	searchSource.Query(elastic.NewMatchQuery("name", "travels"))
	queryStr, err1 := searchSource.Source()
	queryJs, err2 := json.Marshal(queryStr)
	if err1 != nil || err2 != nil {
		fmt.Println("[esclient][GetResponse]err during query marshal=", err1, err2, queryJs)
	}
	//fmt.Println("[esclient]Final ESQuery=\n", string(queryJs))
	searchService := esclient.Search().Index("travels").SearchSource(searchSource)
	ctx := context.Background()
	searchResult, err := searchService.Do(ctx)
	if err != nil {
		fmt.Println("[ProductsES][GetPIds]Error=", err)
		return
	}
	if len(searchResult.Hits.Hits) == 0 {
		fmt.Println("")
		json.NewEncoder(w).Encode("Empty")
		return
	}
	for _, hit := range searchResult.Hits.Hits {
		var ss travel
		err := json.Unmarshal(hit.Source, &ss)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}

		travels = append(travels, ss)
	}
	fmt.Println("students", travels)
	json.NewEncoder(w).Encode(travels)
}
func addtravels(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var use travel
	_ = json.NewDecoder(r.Body).Decode(&use)
	ctx := context.Background()
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		panic("Client fail ")
	}
	dataJSON, err := json.Marshal(use)
	js := string(dataJSON)
	ind, err := esclient.Index().
		Index("travels").
		BodyJson(js).
		Do(ctx)
	if err != nil {
		panic(err)
	}

	fmt.Println("[Elastic][InsertProduct]Insertion Successful", ind)
	json.NewEncoder(w).Encode(use)
}

//bookings
func getbookings(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var bookings []booking
	params := mux.Vars(r)
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		panic("Client fail ")
	}
	searchSource := elastic.NewSearchSource()
	searchSource.Query(elastic.NewMatchQuery("name", params["name"]))
	queryStr, err1 := searchSource.Source()
	queryJs, err2 := json.Marshal(queryStr)
	if err1 != nil || err2 != nil {
		fmt.Println("[esclient][GetResponse]err during query marshal=", err1, err2, queryJs)
	}
	//fmt.Println("[esclient]Final ESQuery=\n", string(queryJs))
	searchService := esclient.Search().Index("bookings").SearchSource(searchSource)
	ctx := context.Background()
	searchResult, err := searchService.Do(ctx)
	if err != nil {
		fmt.Println("[ProductsES][GetPIds]Error=", err)
		return
	}
	if len(searchResult.Hits.Hits) == 0 {
		fmt.Println("")
		json.NewEncoder(w).Encode("Empty")
		return
	}
	for _, hit := range searchResult.Hits.Hits {
		var ss booking
		err := json.Unmarshal(hit.Source, &ss)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}

		bookings = append(bookings, ss)
	}
	fmt.Println("bookings", params["name"])
	length := len(bookings)
	json.NewEncoder(w).Encode(bookings[length-1])
}
func addbookings(w http.ResponseWriter, r *http.Request) {
	//w.Header().Set("Content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var x booking
	_ = json.NewDecoder(r.Body).Decode(&x)
	ctx := context.Background()
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		panic("Client fail ")
	}
	dataJSON, err := json.Marshal(x)
	js := string(dataJSON)
	ind, err := esclient.Index().
		Index("bookings").
		BodyJson(js).
		Do(ctx)

	if err != nil {
		panic(err)
	}

	fmt.Println("[Elastic][InsertProduct]Insertion Successful", ind)
	json.NewEncoder(w).Encode(x)
}
func gettravelsbyname(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var bookings []travel
	params := mux.Vars(r)
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		panic("Client fail ")
	}
	searchSource := elastic.NewSearchSource()
	searchSource.Query(elastic.NewMatchQuery("name", params["name"]))
	queryStr, err1 := searchSource.Source()
	queryJs, err2 := json.Marshal(queryStr)
	if err1 != nil || err2 != nil {
		fmt.Println("[esclient][GetResponse]err during query marshal=", err1, err2, queryJs)
	}
	//fmt.Println("[esclient]Final ESQuery=\n", string(queryJs))
	searchService := esclient.Search().Index("travels").SearchSource(searchSource)
	ctx := context.Background()
	searchResult, err := searchService.Do(ctx)
	if err != nil {
		fmt.Println("[ProductsES][GetPIds]Error=", err)
		return
	}
	if len(searchResult.Hits.Hits) == 0 {
		fmt.Println("")
		json.NewEncoder(w).Encode("Empty")
		return
	}
	for _, hit := range searchResult.Hits.Hits {
		var ss travel
		err := json.Unmarshal(hit.Source, &ss)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}

		bookings = append(bookings, ss)
	}
	fmt.Println("bookings", bookings)
	// length := len(bookings)
	json.NewEncoder(w).Encode(bookings)
}

//main function
func main() {
	r := mux.NewRouter().StrictSlash(true)
	//users
	r.HandleFunc("/users/{name}", getusers).Methods("GET", "OPTIONS")
	r.HandleFunc("/users", addusers).Methods("POST", "OPTIONS")
	//travels
	r.HandleFunc("/travels", gettravels).Methods("GET", "OPTIONS")
	r.HandleFunc("/travels/{name}", gettravelsbyname).Methods("GET", "OPTIONS")
	r.HandleFunc("/travels", addtravels).Methods("POST", "OPTIONS")
	//bookings
	r.HandleFunc("/bookings/{name}", getbookings).Methods("GET", "OPTIONS")
	r.HandleFunc("/bookings", addbookings).Methods("POST", "OPTIONS")
	log.Fatal(http.ListenAndServe(":8000", r))
}
