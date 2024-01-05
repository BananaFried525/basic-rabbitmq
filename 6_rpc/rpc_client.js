const amqp = require('amqplib');
const RandExp = require('randexp');

const QUEUE = 'rpc_queue';
const args = process.argv.slice(2);

(async () => {
  try {
    const connection = await amqp.connect({
      hostname: 'localhost',
      port: '5672',
      username: 'user',
      password: 'bnnf525'
    })

    const channel = await connection.createChannel()
    const { queue } = await channel.assertQueue(QUEUE)

    const correlationId = generateUuid()
    const processTime = parseInt(args[0]);

    console.log(' [x] Waiting for ack (%d) ms', processTime);

    // receiver
    await channel.consume(queue, (msg) => {
      if (msg.properties.correlationId == correlationId) {
        console.log(' [.] Got %s', msg.content.toString());
        setTimeout(function () {
          connection.close();
          process.exit(0)
        }, 500);
      }
    }, {
      noAck: true
    })

    //sender
    channel.sendToQueue(queue,
      Buffer.from(JSON.stringify({
        time: processTime
      })), {
      correlationId: correlationId,
      replyTo: queue
    });

  } catch (error) {
    console.log(error)
    connection.close();
    process.exit(0)
  }
})()

function generateUuid() {
  return new RandExp(new RegExp(/[0-9a-f]{32}/)).gen()
}