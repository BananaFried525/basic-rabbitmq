const amqp = require('amqplib');
const RandExp = require('randexp');

const EXCHANGE = 'topic_logs';

const main = async () => {
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

    const regex = new RegExp(/[A-Za-z0-9]{20}/)
    const payload = {
      date: new Date().toISOString(),
      message: new RandExp(regex).gen(),
    }
    const content = Buffer.from(JSON.stringify(payload), 'utf8')

    // Do
    await channel.assertExchange(EXCHANGE, 'topic', {
      durable: false,
    })

    const topicKey = 'convert.info'
    channel.publish(EXCHANGE, topicKey, content)
    console.log(" [x] Sent %s:'%s'", topicKey, content);

    // End
    setTimeout(async () => {
      await channel.close()
      await connection.close()
      process.exit(0)
    }, 500)
  } catch (error) {
    console.log(error)
    await channel.close()
    await connection.close()
    process.exit(0)
  }
}

main()