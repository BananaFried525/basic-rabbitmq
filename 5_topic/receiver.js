const amqp = require('amqplib');

const EXCHANGE = 'topic_logs';
const args = process.argv.slice(2);

(async (topics) => {
  try {
    // Start
    const connection = await amqp.connect({
      hostname: 'localhost',
      port: '5672',
      username: 'user',
      password: 'bnnf525'
    })

    // Prepare
    const channel = await connection.createChannel()

    //DO
    await channel.assertExchange(EXCHANGE, 'topic', { durable: false })
    const { queue } = await channel.assertQueue('', { exclusive: true })

    console.log(' [*] Waiting for logs. To exit press CTRL+C');

    // connect to each queue that in EXCHANGE_NAME
    topics.forEach(async (topic) => {
      console.log('[x] connect %s', topic)
      await channel.bindQueue(queue, EXCHANGE, topic);
    })

    await channel.consume(queue, (msg) => {
      const contentStr = JSON.parse(msg.content.toString('utf8'))
      console.log(" [x] %s: '%s'", msg.fields.routingKey, contentStr);
    }, {
      noAck: true
    })

    //End
  } catch (error) {
    console.log(error)
  }
})(args)