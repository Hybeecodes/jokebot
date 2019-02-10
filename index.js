const slackBot =  require('slackbots');
const axios = require('axios');

const bot = new slackBot({
    token: 'xoxb-254705497588-546878469187-OONfQpP8MFWIgQlOrpH3kays',
    name: 'jokebot'
});

//start handler
bot.on('start',() => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel('general','Get Ready To Laugh With @Jokebot ',params);
});

// Error Handler
bot.on('error',(err) => console.log(err));

// Message HAndler
bot.on('message',(data) => {
    if(data.type !== 'message'){
        return;
    }
    console.log(data)
    handleMessage(data);
});

// Respond to data
function handleMessage(data) {
    // console.log(message);
    let message = data.text;
    if(message.includes('chuncknorris')){
        chuckJoke();
    }else{
        const params = {
            icon_emoji: ':laughing:'
        };
        if(data.user){
            bot.postMessageToUser('megastar','What can I do For You?',params);
        }
        
        // bot.postMessageToChannel(
        //     'general',
        //     `Please Ask For A Joke`,
        //     params
        // );
        console.log('ask for a joke');
    }
}

// Tell a chunk Norris Joke
function chuckJoke(){
    const url = 'https://api.icndb.com/jokes/random';
    axios.get(url).then(res => {
        const joke = res.data.value.joke;
        const params = {
            icon_emoji: ':laughing:'
        };

        bot.postMessageToChannel(
            'general',
            `Chunk Norris: ${joke}`,
            params
        );
    })
}


// Tell a chunk Norris Joke
function yomamaJoke(){
    const url = 'http://api.yomomma.info';
    axios.get(url).then(res => {
        console.log(res);
        const joke = res.data.joke;
        const params = {
            icon_emoji: ':laughing:'
        };

        bot.postMessageToChannel(
            'general',
            `Yo Mama: ${joke}`,
            params
        );
    }).catch((err)=>{
        console.log(err)
    })
}