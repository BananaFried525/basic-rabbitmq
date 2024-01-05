const amqp = require('amqplib');

const EXCHANGE = 'logs';

(async () => {
  try {
    const connection = await amqp.connect({
      hostname: 'localhost',
      port: '5672',
      username: 'user',
      password: 'bnnf525'
    })

    const channel = await connection.createChannel()
    await channel.assertExchange(EXCHANGE, 'fanout', { durable: true })
    const { queue } = await channel.assertQueue('', { exclusive: true })

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    await channel.bindQueue(queue, EXCHANGE, '');
    await channel.consume(queue, (msg) => {
      const contentStr = JSON.parse(msg.content.toString('utf8'))
      console.log(contentStr)
    }, {
      noAck: true
    })

  } catch (error) {
    console.log(error)
  }
})()