const amqp = require('amqplib');

const QUEUE = 'task_queue';

(async () => {
  try {
    const connection = await amqp.connect({
      hostname: 'localhost',
      port: '5672',
      username: 'user',
      password: 'bnnf525'
    })

    const channel = await connection.createChannel()
    await channel.assertQueue(QUEUE, { durable: true })

    await channel.consume(QUEUE, (msg) => {
      const contentStr = JSON.parse(msg.content.toString('utf8'))
      setTimeout(function () {
        console.log(`[${contentStr.count}] Done`);
        console.log(`message -> ${JSON.stringify(contentStr)}`)
      }, contentStr.sec * 1000);
      // channel.ack(msg)
    }, {
      noAck: true
    })

  } catch (error) {
    console.log(error)
  }
})()