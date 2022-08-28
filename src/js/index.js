document.querySelector("#inputt").value="Enter the observations seperated by comma \nand Treatments(Groups) seperated by lines. \nOne line for one treatment(group). \nEx:- \n1,2,3,4,5,6 \n1,2,3,4,5,6 \n1,2,3,4,5,6 \n Please done use extra line brakes";
alert("after reading instructions please clear the  text field using 'clear button' before enter the data. coding method and problems with unbalanced data cannot be solved using this calculator")

document.querySelector("#btnclear").addEventListener("click",clearAll);
document.querySelector("#btncalc").addEventListener("click",calculate);








function clearAll(){
    let boxtexst= document.querySelectorAll("#row2 .out,#row3 .out,#row4 .out");
    for(let i=0;i<boxtexst.length;i++){
          boxtexst[i].innerHTML="";
    }
    document.querySelector("#inputt").value="";
}


function calculate(){
     let inputstring =document.querySelector("#inputt").value;
     let n=1;
     let a=1;

     for(let i=0;i<inputstring.length;i++){
          if(inputstring.charAt(i)=='\n'){
               a=a+1;
          }
     }
     for(let i=0;i<inputstring.length;i++){
          if(inputstring.charAt(i)==','){
               n=n+1;
          }if(inputstring.charAt(i)=='\n'){
               break;
          }
     }


     let dataarray=[...Array(a)].map(x => Array(n).fill(0));
     let row=0;
     let col=0;
     let temp="";
     for(let i=0;i<inputstring.length;i++){
          if(inputstring.charAt(i)==','){
               dataarray[row][col]=temp;
               temp="";
               col=col+1;
          }else if(inputstring.charAt(i)=='\n'){
               dataarray[row][col]=temp;
               temp="";
               row=row+1;
               col=0;
          }else{
               temp=temp+inputstring.charAt(i);
          }
     }
     dataarray[row][col]=temp;
     temp="";

     let grandtotal=0.0;
     let grandavarage=0.0;
     let sstotal=0.0;
     let ssbetween=0.0;
     let sswithin=0.0;
     let dftotal=0.0;
     let dfbetween=0.0;
     let dfwithin=0.0;
     let msbetween=0.0;
     let mswithin=0.0;
     let fratio=0.0;
     let treatmentmeans=new Array(a).fill(0);
     let N =a*n;
     
     for (let i = 0; i < a ; i++) {
          for(let j=0;j<n;j++){
               grandtotal= grandtotal + parseFloat(dataarray[i][j])
          }
     }
     grandavarage=grandtotal/N;

     for (let i = 0; i < a ; i++) {
          for(let j=0;j<n;j++){
               treatmentmeans[i]=treatmentmeans[i]+parseFloat(dataarray[i][j]);
          }
          treatmentmeans[i]=treatmentmeans[i]/n;
     }
     
     for (let i = 0; i < a ; i++) {
          for(let j=0;j<n;j++){
               sstotal= sstotal + ((parseFloat(dataarray[i][j])-grandavarage)*(parseFloat(dataarray[i][j])-grandavarage));
          }
     }

     for (let i = 0; i < a ; i++) {
          ssbetween=ssbetween + ((treatmentmeans[i]-grandavarage)*(treatmentmeans[i]-grandavarage))
     }
     ssbetween=ssbetween*n;

     sswithin=sstotal-ssbetween;

     msbetween=ssbetween/(a-1);
     mswithin=sswithin/(N-a);
     fratio=msbetween/mswithin;

     document.querySelector("#ssb").innerHTML=ssbetween;
     document.querySelector("#ssw").innerHTML=sswithin;
     document.querySelector("#sst").innerHTML=sstotal;
     document.querySelector("#dofb").innerHTML=(a-1);
     document.querySelector("#dofw").innerHTML=(N-a);
     document.querySelector("#doft").innerHTML=(N-1);
     document.querySelector("#msb").innerHTML=msbetween;
     document.querySelector("#msw").innerHTML=mswithin;
     document.querySelector("#frb").innerHTML=fratio;
     

}


