const amqp = require('amqplib');
const RandExp = require('randexp');

const QUEUE = 'rpc_queue';

const main = async () => {
  try {
    const connection = await amqp.connect({
      hostname: 'localhost',
      port: '5672',
      username: 'user',
      password: 'bnnf525'
    })

    const channel = await connection.createChannel()
    const { queue } = await channel.assertQueue(QUEUE)
    await channel.prefetch(1)
    console.log(' [x] Awaiting RPC requests');
    await channel.consume(queue, (message) => {
      const content = JSON.parse(message.content.toString())
      const processTime = content.time

      setTimeout(async () => {
        console.log(" [x] %s: '%s'", message.fields, message.content.toString());
        const replyPayload = {
          status: 'success'
        }
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(replyPayload)), { correlationId: message.properties.correlationId })
        channel.ack(message)
      }, processTime)
    })

  } catch (error) {
    console.log(error)
  }
}

main()