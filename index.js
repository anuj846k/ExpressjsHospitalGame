
const express=require("express")
const app=express()

var users=[{
    name:"Anuj kumar",
    kidneys:[{
        healthy:false
    }]
}];
app.get('/',function(req,res){
    //write logic
    const Anujskidney=users[0].kidneys
    const Noofkidneys=Anujskidney.length;
    let noofhealthykidneys=0;
    for(let i=0;i<Anujskidney.length;i++){
        if(Anujskidney[i].healthy){
            noofhealthykidneys=noofhealthykidneys+1;

        }

    }
    const noofunhealthykidneys=Noofkidneys-noofhealthykidneys;
    res.json({
        Noofkidneys,
        noofunhealthykidneys,
        noofhealthykidneys

    })
})

app.use(express.json());

app.post("/",function(req,res){

    const isHealthy=req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    })
    res.json({
        msg:"Done!"
    })
})

app.put('/',function(req,res){
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;

    }
    res.json({});
})

//removing all the unhealthy kidneys
app.delete('/',function(req,res){
    //you should return a 411 error if there is no unhealthy kidney
    //only if atleast there is one unhealthy kidney do this ,else return 411
if(isThereAnyUnhealthyKidney()){
    const newKidneys=[];
    for(let i=0;i<users[0].kidneys.length;i++){
     if (users[0].kidneys[i].healthy){
         newKidneys.push({
             healthy:true
         })
     }
 }
 users[0].kidneys=newKidneys;
res.json({msg:"done"}) 
}else{
    res.status(411).json({
        msg:"You have no bad kidneys"
    })
}
 

})

function isThereAnyUnhealthyKidney(){
    let atleastOneUnhealthykidney=false;
    for(let i=0;i<users[0].kidneys.length;i++){
     if (!users[0].kidneys[i].healthy){
         atleastOneUnhealthykidney=true;
        
     }
 }
 return atleastOneUnhealthykidney
}




app.listen(3000)

