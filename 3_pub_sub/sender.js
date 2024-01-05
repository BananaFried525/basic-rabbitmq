const amqp = require('amqplib');
const RandExp = require('randexp');

const QUEUE = 'logs'

const main = async () => {
  try {
    const connection = await amqp.connect({
      hostname: 'localhost',
      port: '5672',
      username: 'user',
      password: 'bnnf525'
    })

    const channel = await connection.createChannel()
    await channel.assertExchange(QUEUE, 'fanout', { durable: true })

    const regex = new RegExp(/[A-Za-z0-9]{20}/)
    const payload = {
      date: new Date().toISOString(),
      message: new RandExp(regex).gen(),
    }
    const content = Buffer.from(JSON.stringify(payload), 'utf8')

    // publish ไปยังทุก node ที่ subscription ไว้
    while (channel.publish(QUEUE, '', content, { persistent: true })) {
      await channel.close()
      await connection.close()
      process.exit(0)
    }
  } catch (error) {
    console.log(error)
  }
}

main()