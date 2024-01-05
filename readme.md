# Learning Basic RabbitMQ

This project is aimed at helping beginners learn the basics of RabbitMQ, a popular message broker that enables communication between different components of a distributed system.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contributing](#contributing)

## Introduction

RabbitMQ is a powerful and flexible message broker that allows applications to communicate with each other using messages. It provides an easy-to-use and reliable way to implement various messaging patterns, such as publish/subscribe, request/reply, and more.

In this project, we will cover the basics of RabbitMQ, including:

- Setting up RabbitMQ server
- Creating queues, exchanges, and bindings
- Publishing and consuming messages
- Understanding message acknowledgment and durability
- Implementing common messaging patterns

## Installation

To get started with RabbitMQ, you need to install it on your local machine. Follow the official RabbitMQ installation guide for your operating system:

- [RabbitMQ Installation Guide](https://www.rabbitmq.com/download.html)

Make sure you have the necessary dependencies installed and the RabbitMQ server is up and running.

## Usage

Once RabbitMQ is installed, you can start exploring its features and functionalities. This project provides examples and code snippets that demonstrate different aspects of RabbitMQ.

To use these examples, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install` or `yarn install`.
3. Run the example scripts located in the different directories of this project.

Feel free to modify and experiment with the examples to deepen your understanding of RabbitMQ.

## Examples

This project includes several examples that cover different topics related to RabbitMQ. Each example is located in a separate directory and comes with its own `README.md` file explaining the usage and purpose of the example.

Here are some examples included in this project:

- [1_hello_world](./1_hello_world) - A simple example demonstrating the basic concepts of RabbitMQ.
- [2_work_queues](./2_work_queues) - An example showing how to distribute tasks among multiple workers.
- [3_pub_sub](./3_pub_sub) - An example implementing the publish/subscribe messaging pattern.
- [4_routing](./4_routing) - An example demonstrating the direct exchange and routing keys.
- [5_topic](./5_topic) - An example illustrating the topic exchange and binding patterns.
- [6_rpc](./6_rpc) - An example showcasing the remote procedure call (RPC) pattern.

Explore each example to learn more about RabbitMQ and its various use cases.

## Contributing

Contributions are welcome! If you have any improvements or new examples to add, feel free to submit a pull request. Please make sure to follow the existing code style and add appropriate tests and documentation.