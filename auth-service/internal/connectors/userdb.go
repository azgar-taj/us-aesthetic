package connectors

import (
	models "auth-service/internal/models"
	"context"
	"fmt"
	"log"
	"os"
	"sync"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type UserDB struct {
	client     *mongo.Client
	collection *mongo.Collection
}

var lock = &sync.Mutex{}

var instance *UserDB

func GetInstance() *UserDB {
	if instance == nil {
		lock.Lock()
		defer lock.Unlock()
		if instance == nil {
			var err error
			log.Println("Creating instance of MongoDB")
			instance, err = NewUserDB(
				os.Getenv("MONGO_CLUSTER"),
				os.Getenv("MONGO_USERNAME"),
				os.Getenv("MONGO_PASSWORD"),
			)
			if err != nil {
				log.Fatalf("Failed to create database instance. Error: %s", err)
				return nil
			}
			log.Println("Succeeded creating MongoDB connection")
		}
	}
	log.Println("Returning existing MongoDB instance")
	return instance
}

func NewUserDB(clusterName string, username string, password string) (*UserDB, error) {
	clientOptions := options.Client().ApplyURI(fmt.Sprintf("mongodb+srv://%s:%s@%s.uo3wozi.mongodb.net/?retryWrites=true&w=majority&appName=SmrutajUs", username, password, clusterName))
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to mongodb: %v", err)
	}
	collection := client.Database("UserDatabase").Collection("users")
	return &UserDB{client: client, collection: collection}, nil
}

func (s *UserDB) Close() {
	err := s.client.Disconnect(context.Background())
	if err != nil {
		log.Printf("Failed to disconnect from MongoDB: %v", err)
	}
}

func (s *UserDB) InsertUser(item models.User) (primitive.ObjectID, error) {
	item.Id = primitive.NewObjectID()
	result, err := s.collection.InsertOne(context.Background(), item)
	if err != nil {
		log.Printf("Failed to insert user: %v", err)
		return primitive.NilObjectID, err
	}
	log.Println("Inserted user:", result.InsertedID)
	return result.InsertedID.(primitive.ObjectID), nil
}

func (s *UserDB) DeleteUser(id string) error {
	formatted_id, _ := primitive.ObjectIDFromHex(id)
	_, err := s.collection.DeleteOne(context.Background(), bson.D{{Key: "_id", Value: formatted_id}})
	if err != nil {
		log.Printf("Failed to delete user: %v", err)
		return err
	}
	log.Println("Deleted user with ID:", id)
	return nil
}

func (s *UserDB) UpdateUser(item models.User) (primitive.ObjectID, error) {
	formatted_id, _ := primitive.ObjectIDFromHex(item.Id.Hex())
	_, err := s.collection.UpdateOne(context.Background(), bson.D{{Key: "_id", Value: formatted_id}}, bson.D{{Key: "$set", Value: item}})
	if err != nil {
		log.Printf("Failed to update user: %v", err)
		return primitive.NilObjectID, err
	}
	log.Println("Updated user:", item.Id)
	return item.Id, nil
}

func (s *UserDB) GetUser(id string) (models.User, error) {
	var item models.User
	formatted_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("Failed to convert ID to ObjectID: %v", err)
		return models.User{}, err
	}
	err = s.collection.FindOne(context.Background(), bson.D{{Key: "_id", Value: formatted_id}}).Decode(&item)
	if err != nil {
		log.Printf("Failed to get user: %v", err)
		return models.User{}, err
	}
	log.Println("Retrieved user:", item)
	return item, nil
}

func (s *UserDB) GetUserByUsername(username string) (models.User, error) {
	var item models.User
	err := s.collection.FindOne(context.Background(), bson.D{{Key: "username", Value: username}}).Decode(&item)
	if err != nil {
		log.Printf("Failed to get user: %v", err)
		return models.User{}, err
	}
	log.Println("Retrieved user:", item)
	return item, nil
}

func (s *UserDB) GetAllStoryItems() ([]models.User, error) {
	cursor, err := s.collection.Find(context.Background(), bson.D{})
	if err != nil {
		log.Printf("Failed to get all users: %v", err)
		return nil, err
	}
	defer cursor.Close(context.Background())
	var items []models.User
	for cursor.Next(context.Background()) {
		var item models.User
		cursor.Decode(&item)
		items = append(items, item)
	}
	log.Println("Retrieved all users:", items)
	return items, nil
}
