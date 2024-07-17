async function createUniqueCache(...args){
    
    let str=''
for(let i=0;i<args.length;i++)
{

    if(args[i]!=undefined)
    {
        str+=args[i]
    }
    else{
        str+='undefined'
    }
}
return str
}
// let name
// let name2
// let name3
// createUniqueCache(name,name2,name3).then(res=>{
//     console.log(res)
// }
// )
module.exports={
    createUniqueCache:createUniqueCache,
}