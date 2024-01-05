const amqp = require('amqplib');

const EXCHANGE = 'direct_logs';

(async () => {
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
    await channel.assertExchange(EXCHANGE, 'direct', { durable: false })
    const { queue } = await channel.assertQueue('', { exclusive: true })

    console.log(' [*] Waiting for logs. To exit press CTRL+C');

    // connect to each queue that in EXCHANGE_NAME
    await channel.bindQueue(queue, EXCHANGE, 'info');
    await channel.bindQueue(queue, EXCHANGE, 'warning');
    await channel.bindQueue(queue, EXCHANGE, 'debug');
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
})()