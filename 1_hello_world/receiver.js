const amqp = require('amqplib');

const QUEUE = 'hello';

(async () => {
  try {
    const connection = await amqp.connect({
      hostname: 'localhost',
      port: '5672',
      username: 'user',
      password: 'bnnf525'
    })

    const channel = await connection.createChannel()
    await channel.assertQueue(QUEUE, { durable: false })
    await channel.consume(QUEUE, (msg) => {
      const contentStr = msg.content.toString('utf8')
      console.log(`message -> ${contentStr}`)
    })

  } catch (error) {
    console.log(error)
  }
})()