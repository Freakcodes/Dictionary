const apiUrl="https://api.dictionaryapi.dev/api/v2/entries/en/";
const input=document.querySelector(".search");
const search=document.querySelector(".glass");
const ul=document.querySelector(".ul");
const ul2=document.querySelector(".secondul");


search.addEventListener('click',()=>{
    let word=input.value;
    
    dictionary(word);
   
    document.querySelector(".ul").innerHTML=" ";
    ul2.innerHTML=" ";
    document.querySelector(".secondpof").style.display="none";
  
   
   
})
//Triggering Enter Button...

input.addEventListener("keypress",(event)=>{
    if(event.key==="Enter"){
        
         search.click();
         
        
    }
    
})


const container=document.querySelector(".container");
const  body= document.querySelector(".body");
const toggle=document.querySelector(".slider");
toggle.addEventListener('click',()=>{
    
    container.classList.toggle("container-darkk");
    body.classList.toggle("dark");
    input.classList.toggle("dark-searchbar");
    
    
    // console.log(container.classList);
    // document.querySelector(".fa-toggle-on").classList.toggle("fa-toggle-off");
})




async function dictionary(word){
    let data;
    const response=await fetch(apiUrl+word);
    if(response.status==404){
        data=await response.json();
        console.log(data);
        document.getElementById("word").innerHTML=data.title;
        document.querySelector(".sorry").style.display="block";
        document.querySelector(".pos1").innerHTML="";
        document.querySelector(".secondpof").style.display="none";
    }
    data=await response.json();
    document.querySelector(".sorry").style.display="none";
   
    console.log(data);
    
    document.querySelector(".pos1").innerHTML=data[0].meanings[0].partOfSpeech;

   
   document.getElementById("word").innerHTML=data[0].word;

   const array1=data[0].meanings[0].definitions;
   for(element in array1){
    if(element>=4){
        break;
    }else{
        let li = document.createElement("li");
        let node = document.createTextNode(array1[element].definition);
        li.appendChild(node);
        ul.appendChild(li);

    }
   
   }
   
document.querySelector(".audio").addEventListener('click',()=>{
    let text= new SpeechSynthesisUtterance(document.getElementById("word").innerHTML);
    speechSynthesis.speak(text);
})








  

   if(data[0].meanings.length>1){
    document.querySelector(".secondpof").style.display="block";
    document.querySelector(".pos2").innerHTML=data[0].meanings[1].partOfSpeech;
    const array2=data[0].meanings[1].definitions;
    

    for(element in array2){
        if(element>=2){
            break;
        }else{
            let li = document.createElement("li");
            let node = document.createTextNode(array2[element].definition);
            li.appendChild(node);
            ul2.appendChild(li);
    
        }


   }
   
}
}

 
 

   
//    document.querySelector(".s2").innerHTML=data[0].meanings[0].synonyms;
//    document.querySelector(".pos1").innerHTML=data[0].meanings[0].partOfSpeech;
   
//    document.querySelector(".pos2").innerHTML=data[0].meanings[1].partOfSpeech;
   
   
   




