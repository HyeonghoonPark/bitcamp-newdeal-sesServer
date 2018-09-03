const express = require('express')
var aws = require('aws-sdk');
const Router = express.Router();
const emaildao = require('./emaildao')


Router.get('/sendEmail', (req, res) => {
    
	
   // Provide the full path to your config.json file. 
    aws.config.loadFromPath('../Commons/config.json');
    
    const sender = "hyeonghoonpark@gmail.com";
    
    const recipient = req.query.sendmail;

    const configuration_set = "park";

    const subject = "[BCM] BCM계정 이메일 주소 인증";

    // The email body for recipients with non-HTML email clients.
    const body_text = "스트테Amazon SES Test (SDK for JavaScript in Node.js)\r\n"
                + "This email was sent with Amazon SES using the "
                + "AWS SDK for JavaScript in Node.js.";
            
    // The HTML body of the email.
    const body_html = `<html>
    <head></head>
    <body>
    <h1>BCM 계정</h1>
    <p>안녕하세요. BCM입니다.<br>
        BCM 서비스 이용을 위해 BCM계정 이메일 주소 인증을 요청하셨습니다. <br>
        BCM 계정 : ${req.query.email} <br>
         아래의 버튼을 클릭하여 이메일 주소 인증을 완료하시면, 해당 서비스를 이용하실 수 있습니다.<br>
        <a href=http://localhost:8000/sesServer/conductEmail?sendmail=${req.query.sendmail}>이메일 주소 인증하기</a></p>
    </body>
    </html>`;

    // The character encoding for the email.
    const charset = "UTF-8";

    // Create a new SES object. 
    var ses = new aws.SES();

    // Specify the parameters to pass to the API.
    var params = { 
    Source: sender, 
    Destination: { 
        ToAddresses: [
        recipient 
        ],
    },
    Message: {
        Subject: {
        Data: subject,
        Charset: charset
        },
        Body: {
        Text: {
            Data: body_text,
            Charset: charset 
        },
        Html: {
            Data: body_html,
            Charset: charset
        }
        }
    },
    ConfigurationSetName: configuration_set
    };

    //Try to send the email.
    ses.sendEmail(params, function(err, data) {
    // If something goes wrong, print an error message.
    if(err) {
        console.log(err.message);
    } else {
        console.log("Email sent! Message ID: ", data.MessageId);
        
        res.writeHead(302, {"Location": "http://localhost:8080/bitcamp-newdeal-project/signIn.html"});
        
        res.end();
    }
    });

   
})

Router.get('/conductEmail', (req, res) => {
	
	console.log('router');
	
	emaildao.update(req.query, (err,result) => {
        
		
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }else{
        
        res.writeHead(302, {"Location":`http://localhost:8080/bitcamp-newdeal-project/signIn.html`});
        
        res.end('변경 성공입니다!'); 
        
        }
    })
    
})


module.exports = Router;