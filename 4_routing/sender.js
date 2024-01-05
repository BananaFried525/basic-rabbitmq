const amqp = require('amqplib');
const RandExp = require('randexp');

const EXCHANGE = 'direct_logs'

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
    const severity = ['error', 'warning', 'debug', 'info'][new RandExp(new RegExp(/[0-3]{1}/)).gen()]

    await channel.assertExchange(EXCHANGE, 'direct', {
      durable: false,
    })
    channel.publish(EXCHANGE, severity, content)
    console.log(" [x] Sent %s: '%s'", severity, content);

    // End
    setTimeout(async () => {
      await channel.close()
      await connection.close()
      process.exit(0)
    }, 500)
  } catch (error) {
    console.log(error)
  }
}

main()