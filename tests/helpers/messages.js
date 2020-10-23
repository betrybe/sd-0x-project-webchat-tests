const faker = require('faker');

function generateMessage() {
  const chatMessage = faker.hacker.phrase();
  const nickname = faker.name.firstName();
  return { chatMessage, nickname };
}

async function sendAMessage(page, { chatMessage: message, nickname: user }) {
  const chatMessage = message || faker.lorem.sentence;
  const nickname = user || faker.internet.userName;

  await page.goto(BASE_URL);

  const nicknameBox = await page.$('[data-testid=nickname-box]');
  await nicknameBox.type(nickname);

  const saveButton = await page.$('[data-testid=nickname-save]');
  await saveButton.click();

  const messageBox = await page.$('[data-testid=message-box]');
  await messageBox.type(chatMessage);

  const sendButton = await page.$('[data-testid=send-button]');
  await sendButton.click();
}

module.exports = { generateMessage, sendAMessage };
