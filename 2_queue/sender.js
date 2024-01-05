const amqp = require('amqplib');
const RandExp = require('randexp');

const QUEUE = 'task_queue'

const main = async () => {
  try {
    const connection = await amqp.connect({
      hostname: 'localhost',
      port: '5672',
      username: 'user',
      password: 'bnnf525'
    })

    const channel = await connection.createChannel()
    await channel.assertQueue(QUEUE, { durable: true })


    for (let i = 1; i <= 10; i++) {
      const regex = new RegExp(/[A-Za-z0-9]{20}/)
      const payload = {
        date: new Date().toISOString(),
        message: new RandExp(regex).gen(),
        sec: 5,
        count: i
      }
      const rawPayload = Buffer.from(JSON.stringify(payload), 'utf8')
      channel.sendToQueue(QUEUE, rawPayload, { persistent: true })

    }
    await channel.close()
    await connection.close()
    process.exit(0)
  } catch (error) {
    console.log(error)
  }
}

main()