const { BotFrameworkAdapter } = require('botbuilder');
const restify = require('restify');

// Create server
const server = restify.createServer();

// Root endpoint
server.get('/', (req, res, next) => {
    res.send(200, 'Microsoft Teams Echo Bot is running!');
    next();
});

server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Echo bot logic
server.post('/api/messages', async (req, res) => {
    try {
        await adapter.processActivity(req, res, async (context) => {
            if (context.activity.type === 'message') {
                await context.sendActivity(`You said: ${context.activity.text}`);
            }
        });
        res.send(200);
    } catch (err) {
        res.send(500, err.message);
    }
});
