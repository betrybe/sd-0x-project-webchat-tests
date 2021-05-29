/**
 * @jest-environment node
 */
 require('dotenv').config();

 const puppeteer = require('puppeteer');
 
 const BASE_URL = 'http://localhost:3000/';
 
 function dataTestid(name) {
   return `[data-testid=${name}]`;
 }
 
 const nickname = 'Ada Lovelace';
 const anotherNickname = 'Alan Turing';
 
 describe('3 - Informe a todas as pessoas quem está online no momento', () => {
   let browser;
   let page;
 
   beforeEach(async (done) => {
     browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1920,1080'], headless: true });
     page = await browser.newPage();
     done();
   });
 
   afterEach(async (done) => {
     await browser.close();
     done();
   });
 
   it('Será validado que quando um cliente se conecta, seu nome aparece no front-end de todos', async () => {
     // a client connects
     await page.goto(BASE_URL);
     await page.waitForSelector(dataTestid('online-user'));
 
     //he sees his name on screen
     let client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     await page.waitForTimeout(500);
     expect(client1Nicknames.length).toBe(1);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     //another client connects
     const page2 = await browser.newPage();
     await page2.setCacheEnabled(false);
     await page2.goto(BASE_URL);
     await page2.waitForSelector(dataTestid('online-user'));
 
     //he sees his name and the other on screen
     let client2Nicknames = await page2.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client2Nicknames.length).toBe(2);
     expect(client2Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // the first client sees the sencond client name
     await page.bringToFront();
     await page.waitForTimeout(500);
 
     client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client1Nicknames.length).toBe(2);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     //another client connects
     const page3 = await browser.newPage();
     await page3.setCacheEnabled(false);
     await page3.goto(BASE_URL);
     await page3.waitForSelector(dataTestid('online-user'));
 
     //he sees his name and the other on screen
     const client3Nicknames = await page3.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client3Nicknames.length).toBe(3);
     expect(client3Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // the first client sees the sencond and third client name
     await page.bringToFront();
     await page.waitForTimeout(500);
     client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client1Nicknames.length).toBe(3);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // the second client sees the sencond and third client name
     await page2.bringToFront();
     await page2.waitForTimeout(500);
     client2Nicknames = await page2.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client2Nicknames.length).toBe(3);
     expect(client2Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
   });
 
   it('Será validado que quando um cliente se desconecta, seu nome desaparece do front-end dos outros clientes', async () => {
     // a client connects
     await page.goto(BASE_URL);
     await page.waitForSelector(dataTestid('online-user'));
 
     //he sees his name on screen
     let client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     await page.waitForTimeout(500);
     expect(client1Nicknames.length).toBe(1);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     //another client connects
     const page2 = await browser.newPage();
     await page2.setCacheEnabled(false);
     await page2.goto(BASE_URL);
     await page2.waitForSelector(dataTestid('online-user'));
 
     //he sees his name and the other on screen
     let client2Nicknames = await page2.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client2Nicknames.length).toBe(2);
     expect(client2Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // the first client sees the sencond client name
     await page.bringToFront();
     await page.waitForTimeout(500);
 
     client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client1Nicknames.length).toBe(2);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     //another client connects
     const page3 = await browser.newPage();
     await page3.setCacheEnabled(false);
     await page3.goto(BASE_URL);
     await page3.waitForSelector(dataTestid('online-user'));
 
     //he sees his name and the other on screen
     const client3Nicknames = await page3.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client3Nicknames.length).toBe(3);
     expect(client3Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // the first client sees the sencond and third client name
     await page.bringToFront();
     await page.waitForTimeout(500);
     client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client1Nicknames.length).toBe(3);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // the second client sees the sencond and third client name
     await page2.bringToFront();
     await page2.waitForTimeout(500);
     client2Nicknames = await page2.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client2Nicknames.length).toBe(3);
     expect(client2Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     //------------------------------------------------------------------------
     // up here its the same test above
     //------------------------------------------------------------------------
 
     // now the first client leaves
     await page.close();
 
     // the second client sees two other names
     await page2.bringToFront();
     await page2.waitForTimeout(500);
     client2Nicknames = await page2.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client2Nicknames.length).toBe(2);
     expect(client2Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // the third client sees two other names
     await page3.bringToFront();
     await page3.waitForTimeout(500);
     client2Nicknames = await page3.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client2Nicknames.length).toBe(2);
     expect(client2Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // now the third client leaves
     await page3.close();
 
     // the second client sees only his name
     await page2.bringToFront();
     await page2.waitForTimeout(500);
     client2Nicknames = await page2.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client2Nicknames.length).toBe(1);
     expect(client2Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
   });
 
   it('Será validado que quando um cliente atualiza seu nickname, o nickname é atualizado no front-end de todos os clientes', async () => {
     // a client connects
     await page.goto(BASE_URL);
     await page.waitForSelector(dataTestid('online-user'));
 
     //he sees his name on screen
     let client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     await page.waitForTimeout(500);
     expect(client1Nicknames.length).toBe(1);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // he changes his nickname
     let nicknameBox = await page.$(`input${dataTestid('nickname-box')}`);
     await nicknameBox.type(nickname);
 
     let nicknameButton = await page.$(`button${dataTestid('nickname-button')}`);
     await nicknameButton.click();
 
     // he sees it changed
     client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     await page.waitForTimeout(500);
     expect(client1Nicknames.length).toBe(1);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(nickname),
       ])
     )
 
     //another client connects
     const page2 = await browser.newPage();
     await page2.setCacheEnabled(false);
     await page2.goto(BASE_URL);
     await page2.waitForSelector(dataTestid('online-user'));
 
     //he sees his name and the other on screen
     let client2Nicknames = await page2.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client2Nicknames.length).toBe(2);
     expect(client2Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(nickname),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // the first client sees the sencond client name
     await page.bringToFront();
     await page.waitForTimeout(500);
 
     client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client1Nicknames.length).toBe(2);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(nickname),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     //another client connects
     const page3 = await browser.newPage();
     await page3.setCacheEnabled(false);
     await page3.goto(BASE_URL);
     await page3.waitForSelector(dataTestid('online-user'));
 
     //he sees his name and the other on screen
     let client3Nicknames = await page3.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client3Nicknames.length).toBe(3);
     expect(client3Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(nickname),
         expect.stringMatching(/^[\w'-]{20}$/),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // he changes his nickname
     await page3.bringToFront();
     await page3.waitForSelector(dataTestid('online-user'));
 
     nicknameBox = await page3.$(`input${dataTestid('nickname-box')}`);
     await nicknameBox.type(anotherNickname);
 
     nicknameButton = await page3.$(`button${dataTestid('nickname-button')}`);
     await nicknameButton.click();
     await page.waitForTimeout(500);
 
     // he sees it changed
     client3Nicknames = await page3.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client3Nicknames.length).toBe(3);
     expect(client3Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(nickname),
         expect.stringMatching(anotherNickname),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
 
     // the first client sees the sencond and third client name
     await page.bringToFront();
     await page.waitForTimeout(500);
     client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client1Nicknames.length).toBe(3);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(nickname),
         expect.stringMatching(anotherNickname),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // the second client sees the sencond and third client name
     await page2.bringToFront();
     await page2.waitForTimeout(500);
     client2Nicknames = await page2.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client2Nicknames.length).toBe(3);
     expect(client2Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(nickname),
         expect.stringMatching(anotherNickname),
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
   });
 
   it('Será validado que os nicknames são mostrados na ordem correta', async () => {
     // a client connects
     await page.goto(BASE_URL);
     await page.waitForSelector(dataTestid('online-user'));
 
     //he sees his name on screen
     let client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     await page.waitForTimeout(500);
     expect(client1Nicknames.length).toBe(1);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(/^[\w'-]{20}$/),
       ])
     )
 
     // he changes his nickname
     let nicknameBox = await page.$(`input${dataTestid('nickname-box')}`);
     await nicknameBox.type(nickname);
 
     let nicknameButton = await page.$(`button${dataTestid('nickname-button')}`);
     await nicknameButton.click();
 
     // he sees it changed
     client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     await page.waitForTimeout(500);
     expect(client1Nicknames.length).toBe(1);
     expect(client1Nicknames).toEqual(
       expect.arrayContaining([
         expect.stringMatching(nickname),
       ])
     )
 
     //another client connects
     const page2 = await browser.newPage();
     await page2.setCacheEnabled(false);
     await page2.goto(BASE_URL);
     await page2.waitForSelector(dataTestid('online-user'));
 
     //he sees his name first on the screen
     let client2Nicknames = await page2.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client2Nicknames.length).toBe(2);
     expect(client2Nicknames[0]).toMatch(/^[\w'-]{20}$/);
     expect(client2Nicknames[1]).toEqual(nickname);
 
     // the first client sees the sencond client name
     await page.bringToFront();
     await page.waitForTimeout(500);
 
     client1Nicknames = await page.$$eval(dataTestid('online-user'), (nodes) => nodes.map((n) => n.innerText));
     expect(client1Nicknames.length).toBe(2);
     expect(client1Nicknames[0]).toEqual(nickname);
     expect(client1Nicknames[1]).toMatch(/^[\w'-]{20}$/);
 
   });
 });
