package main

import(
	"crypto/tls"
	"fmt"
	"encoding/json"
	"github.com/LucasV26/imersao6-go/email"
	"github.com/LucasV26/imersao6-go/kafka"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	gomail "gopkg.in/mail.v2"
)

func main() {
	var emailCh = make(chan email.Email)
	var msgCh = make(chan *ckafka.Message)

	d := gomail.NewDialer(
		"smtp.gmail.com",
		587,
		"emailAddress",
		"emailPassword",
	)

	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	es := email.NewMailSender()
	es.From = "capratofficial@gmail.com"
	es.Dailer = d

	go es.Send(emailCh)

	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": "host.docker.internal:9094",
		"client.id": 	     "emailapp",
		"group.id": 		 "emailapp",
	}

	topics := []string{"emails"}

	consumer := kafka.NewConsumer(configMap, topics)

	go consumer.Consume(msgCh)

	for msg := range msgCh {
		var input email.Email
		json.Unmarshal(msg.Value, &input)
		fmt.Println("Recebendo mensagem")
		emailCh <- input
	}
}