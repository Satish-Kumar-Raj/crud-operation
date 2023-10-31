const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const PORT=process.env.PORT||3000



app.use(bodyParser.urlencoded({
    extended:true
}))
// connection 
mongoose.connect("mongodb://127.0.0.1:27017/Form",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Successfully")
})
.catch((err)=>{
    console.log("Connection failed.......",err)
})
// model
const form=mongoose.model('Form2',{
    Name:String,
    email:String,
    phone:String,
    date:String,
    gender:String,
    city:String
})

// access file
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
// middleware



// insert data
app.post('/ho',(req,res)=>{
    console.log(req.body.Name)
    const {Name,email,phone,gender,date,city}=req.body;

    const data=form({
        Name,email,phone,gender,date,city
    })

    data.save().then(()=>{
        res.send("Successfully store data")
    })
    .catch((err)=>{
        res.status(500).send("Error ",err)
        console.log("Not store data",err)
    })
})


// show data
app.get('/show',(req,res)=>{
    form.find({}).then(user=>{
        const table=
    
        `
        <table style="border:1px solid">
        <tr>
        <th>Name </th>
        <th>Email </th>
        <th>Mobile No</th>
        <th>Gender </th>
        <th>Date of Birth </th>
        <th>Location </th>
        <tr>
        
        ${user.map(item=>`
            
            <tr style="border-bottom:1px solid">
          
            
                <td>${item.Name} </td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.gender}</td>
                <td>${item.date}</td>
                <td>${item.city}</td>
            </tr>
            `
        )}

        </table>
        `
        res.send(table)
    }
    )
})

app.listen(PORT,(err)=>{
    if(!err){
        console.log(`server on running http://localhost:${PORT}`)
    }
})