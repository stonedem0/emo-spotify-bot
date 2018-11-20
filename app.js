// Imports dependencies and set up http server
const Koa = require('koa'),
    Router = require('koa-router'),
    koaBody = require('koa-body'),
    session = require('telegraf/session'),
    app = new Koa(),
    router = new Router(),

    //Import helper functions
    helper = require('./helpers')
    spotifySearch = require('./spotifyConfig')


app.use(koaBody())
app.use(router.routes())

require('dotenv').config()

// Url and token for connect to Telegram API
const token = process.env.ACCESS_TOKEN
const url = process.env.URL
const port = parseInt(process.env.PORT || '3005', 10)

// Imports and set up framework for bot
const Telegraf = require('telegraf'),
      bot = new Telegraf(token) 
      bot.use(session())

      // If method is POST call handleUpdate function which just part of Telegraf API
      // and handle raw Telegram update
      app.use((ctx, next) => ctx.method === 'POST' || ctx.url === '/emo_marvin' ?
          bot.handleUpdate(ctx.request.body, ctx.response) :
          next())
      
      // Just some home page
      router.get('/', ctx => {
          console.log(ctx)
          ctx.body = 'emo Marvin lives here';
      })
      
    
// Set up webhook
bot
    .telegram
    .setWebhook(url);

// Bot shills    

bot.start(({
    reply
}) => reply('wanna some real sad stuff? send \'song\' to get some emo song'))

bot.hears('song', async (ctx) => {
    const trackUrl = await spotifySearch()
    ctx.reply(helper.random(trackUrl, trackUrl.length))
})

// Error handle
bot.catch((err) => {
    console.log('hmmmm, something wrong', err)
})

// Listening port
app.listen(port, () => {
    console.log('emo Marvin is here')
})

