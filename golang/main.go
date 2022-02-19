package main

import(
	"os"
	"fmt"
	"crypto/tls"
	"encoding/json"
	"github.com/LucasV26/imersao6-go/email"
	"github.com/LucasV26/imersao6-go/kafka"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	gomail "gopkg.in/mail.v2"
)

func main() {
	var emailCh = make(chan email.Email)
	var msgCh = make(chan *ckafka.Message)

	port, _ := strconv.Atoi(os.Getenv("MAIL_PORT"))

	d := gomail.NewDialer(
		os.Getenv("MAIL_HOST"),
		port,
		os.Getenv("MAIL_USER"),
		os.Getenv("MAIL_PASSWORD"),
	)

	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	es := email.NewMailSender()
	es.From = os.Getenv("MAIL_FROM")
	es.Dailer = d

	go es.Send(emailCh)

	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": 	os.Getenv("BOOTSTRAP_SERVERS"),
		"security.protocol": 	os.Getenv("SECURITY_PROTOCOL"),
		"sasl.mechanisms": 		os.Getenv("SASL_MECHANISMS"),
		"sasl.username": 		os.Getenv("SASL_USERNAME"),
		"sasl.password": 		os.Getenv("SASL_PASSWORD"),
		"client.id": 	     	"emailapp",
		"group.id": 		 	"emailapp",
		"session.timeout.ms": 	45000,
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