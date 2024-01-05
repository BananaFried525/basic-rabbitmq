const amqp = require('amqplib');
const RandExp = require('randexp');

const QUEUE = 'hello'

const main = async () => {
  try {
    const connection = await amqp.connect({
      hostname: 'localhost',
      port: '5672',
      username: 'user',
      password: 'bnnf525'
    })

    const channel = await connection.createChannel()
    await channel.assertQueue(QUEUE, { durable: false })

    const regex = new RegExp(/[A-Za-z0-9]{20}/)
    const payload = {
      date: new Date().toISOString(),
      message: new RandExp(regex).gen()
    }
    const rawPayload = Buffer.from(JSON.stringify(payload), 'utf8')
    while (channel.sendToQueue(QUEUE, rawPayload, { persistent: true })) {
      console.log('sent')
      await channel.close()
      await connection.close()
      process.exit(0)
    }
  } catch (error) {
    console.log(error)
  }
}

main()