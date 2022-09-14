import twilio from 'twilio'

const accountSid = 'AC3fa8f7865d38f5f5e9a5b595713ed07a'
const authToken = '1ec5212d78800e8e91d583be825268d9'

const client = twilio(accountSid, authToken)

try {
   const message = await client.messages.create({
      body: 'Hola soy un SMS desde Node.js!',
      from: '+18154863907',
      to: '+541127221916'
   })
   console.log(message)
} catch (error) {
   console.log(error)
}
