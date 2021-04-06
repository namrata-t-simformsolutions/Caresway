// const sgmail=require('sendgrid/mail');
const sgmail =require ("@sendgrid/mail");
sgmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail=(email,name)=>{
    sgmail.send({
        to:email,
        // to:'rparts565865@gmail.com',
        from:'rparts565865@gmail.com',
        subject:`Welcome to Caresway! ${name} `,
        text:'Thank you for using us!'
    }).then(()=>{
        console.log('success');
    }).catch((e)=>{
        console.log('failed');
    })
}

const deleteMail=(email,name)=>{
    sgmail.send({
        to:email,
        from:'rparts565865@gmail.com',
        subject:`Account Delete of ${name}`,
        text:'Your data is successfully deleted!!'
    })
}

module.exports={
    sendMail,
    deleteMail
}