//variable objet globale qui stocke la valeur des scores de chaque joueur et de nbpionMiodina à chaque fois
var resultat={
    nbpionMiodina:0,
    score1:0,
    score2:0
}

var joueurActuel=1;

//Fonction permettant de créer des éléments HTML
function createElement(elts){
    return document.createElement(elts);
}

//Fonction équivalent de appendChild()
function appendChild(eltParent , eltEnfant){
    eltParent.appendChild(eltEnfant);
}

//Fonction qui permet de générer le tour pour qu'un joueur ne peut jouer plus d'une fois
function changerTour(joueurActuel){
    if (joueurActuel==1)
        joueurActuel=2;
    else    
        joueurActuel=1;
    return joueurActuel;
}

//Création de la table de jeu
function createTable(nbCase,table){
    for(i=0; i<4; i++){
        tr= createElement("tr");
        tr.id= "lig"+i;
        for(j=0;j<nbCase; j++){
            td= createElement("td");
            bouton = createElement("button");
            bouton.innerHTML= 2;
            bouton.id= "l"+i+"c"+j;
            bouton.className="btn";
            bouton.style.fontSize="25px";
            bouton.style.margin="4px";
            appendChild(td,bouton);
            appendChild(tr,td);
        }
        appendChild(table,tr);
    }
}

//fonction qui permet d'obtenir la ligne qui contient un élément button de la table de jeu
function getLigne(bouton){
    identifiant = bouton.id;
    intermediaire = identifiant.split('l');
    intermediaire = intermediaire[1].split('c') ;
    ligne = intermediaire[0];
    return parseInt(ligne);            
}

//Fonction qui génère le tableau des scores au début du jeu
function InitialisationScore(nom1,nom2,tableScore){
    noms=[nom1,nom2];
    for(i=0; i<2; i++){
        tr= createElement("tr");
        valeur=[noms[i],0];
        for(j=0; j<2; j++){
            td= createElement("td");
            if(j==1){
                td.id= "score"+(i+1);    
            }
            td.style.color= "rgb(116, 58, 11)";
            td.style.fontSize= "20px";
            td.innerHTML= valeur[j];
            appendChild(tr,td);
        }
        appendChild(tableScore,tr)
    }
}

//Fonction qui génère le déplacement des pions sur une ligne à indice paire
function mitetyLignePair(boutons,index,nbCase,ligne,resultat){
    i= index+1;
    nbpionMiodina = resultat.nbpionMiodina;
    while((nbpionMiodina>0)&&(i<nbCase*(ligne+1))){
        nbpionMiodina -=1;
        boutons[i].innerHTML = parseInt(boutons[i].innerHTML)+1;

        //Refa lany ny antanana
        if((nbpionMiodina==0)&&(boutons[i].innerHTML==1)){
            //mandry 
            console.log("mandry");
            break;
        }
        else if ((nbpionMiodina==0)&&(boutons[i].innerHTML!=0)){
            //tsy mandry 
            nbpionMiodina += parseInt(boutons[i].innerHTML);
            boutons[i].innerHTML = 0;
            
            
            //Test prise dans gestion score
            if(ligne==2){   
                indice = i-nbCase;
                iP= i; //iP comme indice Prise
            
                //Test prise raha mbola misy am opposé any 
                if(boutons[indice].innerHTML>0){
                    resultat.score2 += parseInt(boutons[indice].innerHTML);
                    boutons[indice].innerHTML = 0; 

                    // Changer la background de l'élément cliqué
                    boutons[iP].style.backgroundColor="red";
                    boutons[iP].style.color="white";
                    boutons[indice].style.backgroundColor="red";
                    boutons[indice].style.color="white";
                    
                    // Attendre 2 secondes et revenir à son état normal
                    setTimeout(function() {
                        // Revenir à l'état normal      
                        console.log("Miditra");
                        boutons[indice].style.backgroundColor="";
                        boutons[indice].style.color="";
                        boutons[iP].style.color="";
                        boutons[iP].style.backgroundColor="";
                    }, 2000);
                }
        
                //Test prise raha tsisy tsony ny opposé any de maka amle eo ambany
                else{
                    somme=0;
                    for(j=0; j<nbCase-1;j++){
                        somme += (parseInt(boutons[(ligne-1)*parseInt(nbCase)+j].innerHTML));
                    }

                    //Raha zéro daoly de mihinana amle ao amle ligne ambaniny zany==== somme =0
                    if(somme==0){
                        indice= i - nbCase*ligne; //indice nle case ho alaina le pion
                        resultat.score2 += parseInt(boutons[indice].innerHTML);    
                        boutons[indice].innerHTML=0;      
                    }              
                }
            }
        }
        
        if(nbpionMiodina<0)
            break;
        i++;
    }    

    //Gestion de la valeur de retour
    resultat={nbpionMiodina: nbpionMiodina, score1: resultat.score1, score2: resultat.score2}
    return resultat;
} 

//Fonction qui génère le déplacement des pions sur une ligne à indice impaire
function mitetyLigneImpair(boutons,index,nbCase,ligne,resultat){
    i=index-1;
    nbpionMiodina = resultat.nbpionMiodina;

    while((nbpionMiodina>0)&&((i>=nbCase*ligne)&&(i<nbCase*(ligne+1)))){   
        nbpionMiodina -=1;
        boutons[i].innerHTML = 1+parseInt(boutons[i].innerHTML);
        //Refa lany ny antanana
        if((nbpionMiodina==0)&&(boutons[i].innerHTML==1)){
            //mandry 
            console.log("mandry");
            break;
        }
        else if ((nbpionMiodina==0)&&(boutons[i].innerHTML!=0)){
            //tsy mandry 
            nbpionMiodina += parseInt(boutons[i].innerHTML);
            boutons[i].innerHTML = 0;
            
            if(ligne==1){   
                indice = i+parseInt(nbCase);
                iP= i; //iP comme indice Prise
            
                //Test prise raha mbola misy am opposé any 
                if(boutons[indice].innerHTML>0){
                    resultat.score1 += parseInt(boutons[indice].innerHTML);
                    boutons[indice].innerHTML = 0; 
                    
                    // Changer la background de l'élément cliqué
                    boutons[iP].style.backgroundColor="red";
                    boutons[iP].style.color="white";
                    boutons[indice].style.backgroundColor="red";
                    boutons[indice].style.color="white";
                    
                    // Attendre 2 secondes et revenir à son état normal
                    setTimeout(function() {
                        // Revenir à l'état normal
                        boutons[indice].style.backgroundColor="";
                        boutons[indice].style.color="";
                        boutons[iP].style.color="";
                        boutons[iP].style.backgroundColor="";
                    }, 2000);

                }
        
                //Test prise raha tsisy tsony ny opposé any de maka amle eo ambany
                else{
                    somme=0;
                    //Calculena aloha raha efa tsisy tsony le ligne eo ambany
                    for(j=0; j<nbCase;j++)
                        somme += (parseInt(boutons[(ligne+1)*nbCase+j].innerHTML));
                    //Raha zéro daoly de mihinana amle ao amle ligne ambaniny zany
                    if(somme==0){
                        indice = i+parseInt(nbCase)*2; 
                        resultat.score1 += parseInt(boutons[indice].innerHTML);
                        boutons[indice].innerHTML=0;
                    }               
                }
            }
        }
        
        if(nbpionMiodina<0)
            break;
        i--;
    }
    resultat= {nbpionMiodina: nbpionMiodina, score1:resultat.score1, score2:resultat.score2}
    return resultat;
}

//Fonction qui génère le jeu d'un joueur jusqu'à ce qu'il soit "mandry"
function jouer(ligne,nbCase,index,resultat){
    nbpionMiodina = resultat.nbpionMiodina;
    //Jeu du joueur 1
    if((ligne==0)||(ligne==2)){
        //initialisation 
        limite= (nbCase*ligne)-1;
        resultat = mitetyLignePair(boutons,index,nbCase,ligne,resultat);
        while(nbpionMiodina>0){
            resultat = mitetyLigneImpair(boutons,nbCase*(ligne+2),nbCase,ligne+1,resultat);  
            if(nbpionMiodina==0)
                break;
            else{
                resultat = mitetyLignePair(boutons,limite,nbCase,ligne,resultat);
            }        
        }
    }

    if((ligne==1)||(ligne==3)){
        //initialisation 
        limite= parseInt(nbCase*(ligne-1))-1;
        resultat = mitetyLigneImpair(boutons,index,nbCase,ligne,resultat);
        while(nbpionMiodina>0){
            resultat = mitetyLignePair(boutons,limite,nbCase,ligne-1,resultat);  
            if(nbpionMiodina==0)
                break;
            else{
                resultat = mitetyLigneImpair(boutons,(ligne+1)*nbCase,nbCase,ligne,resultat);
            }        
        }
    }
    console.log("Jeu \npions: "+resultat.nbpionMiodina+"\nscore1: "+resultat.score1+"\nscore2: "+resultat.score2);
    return resultat;
}

window.addEventListener('load',()=>{
    formulaire= document.getElementById("formulaire");
    formulaire1= document.getElementById("formulaire1");
    page1= document.getElementById("page1");
    page2= document.getElementById("page2");
    tabjoueur= document.getElementById("tabJoueur");

    //Page1 vers page2
    formulaire.addEventListener("submit",(e)=>{
        e.preventDefault();
        nom1= document.getElementById("userName1");
        nom2= document.getElementById("userName2");
        msg= document.getElementById("messageErreur");
        //Test si les joueurs ont bien complété le formulaire et affichage d'un message d'erreur au cas où ils ne l'ont pas fait
        if((nom1.value=="")||(nom2.value=="")){
            msg.innerHTML="Un champ n'a pas été complété, veuillez vérifier s'il vous plaît";
            msg.style.backgroundColor="rgba(250, 228, 202,0.9)";
            msg.style.color="red";
        }
        else{
            page1.style.display= "none";
            page2.style.display= "block";
            page3.style.display="none";
        }
    })

    //Page2 vers page3
    formulaire1.addEventListener("submit",(e)=>{
        e.preventDefault();
        msg1= document.getElementById("messageErreur1");
        nCase = document.getElementById("nbCase");
        
        if ((nCase.value=="")||(nCase.value<3)||(nCase>8)){
            msg1.innerHTML="Veuillez entrer une valeur comprise entre 4 et 7";
            msg1.style.backgroundColor="rgba(250, 228, 202,0.9)";
            msg1.style.color="red";
        }
        else{    
            //Changement des blocs
            page1.display="none";
            page2.style.display= "none";
            page3.style.display= "block";
            
            //Création de la table de jeu
            nbCase=nCase.value;
            createTable(nbCase,tabjoueur);
        
            tables = document.getElementById("tables");
            tables.style.display="block";

            //InitialisationScore
            nomJ1= nom1.value;
            nomJ2= nom2.value;
            tableScore= document.getElementById("tableScore");
            InitialisationScore(nomJ1,nomJ2,tableScore);
            
            score1 = document.getElementById("score1");
            score2 = document.getElementById("score2");

            alert("C'est au joueur "+joueurActuel+" de commencer le jeu! Vas-y "+nomJ1);

            //Clique sur un bouton
            boutons = document.querySelectorAll('.btn');
            boutons.forEach((element,index) => {
                element.addEventListener('click',()=>{
                    ligne = parseInt(getLigne(element));

                    //Jeu du joueur 1
                    if((ligne==0)||(ligne==1)){
                        if(joueurActuel==2)
                            alert("Vous vous trompez de ligne, réessayez s'il vous plaît "+nomJ2);
                        else{
                            resultat.nbpionMiodina = parseInt(boutons[index].innerHTML);
                            boutons[index].innerHTML = 0;
                            
                            // Changer la background de l'élément cliqué
                            boutons[index].style.backgroundColor="rgb(190, 110, 45)";
                            boutons[index].style.color="white";
                            // Attendre 2 secondes et revenir à son état normal
                            setTimeout(function() {
                                // Revenir à l'état normal
                                boutons[index].style.backgroundColor="";
                                boutons[index].style.color="";
                            }, 2000);
            
                            resultat = jouer(ligne,nbCase,index,resultat);
                            score1.innerHTML= parseInt(resultat.score1);
                            joueurActuel=changerTour(joueurActuel);
                            alert(nomJ2+", c'est à vous maintenant");  
                        }                
                    }
                    
                    //Jeu du joueur 2
                    else if((ligne==2)||(ligne==3)){
                        if(joueurActuel==1)
                            alert("Vous vous trompez de ligne, réessayez s'il vous plaît "+nomJ1);
                        else{
                            resultat.nbpionMiodina = parseInt(boutons[index].innerHTML);
                            boutons[index].innerHTML=0;

                            // Changer la background de l'élément cliqué
                            boutons[index].style.backgroundColor="rgb(190, 110, 45)";
                            boutons[index].style.color="white";
                            // Attendre 2 secondes et revenir à son état normal
                            setTimeout(function() {
                                // Revenir à l'état normal
                                boutons[index].style.backgroundColor="";
                                boutons[index].style.color="";
                            }, 2000);

                            resultat = jouer(ligne,nbCase,index,resultat);
                            score2.innerHTML= parseInt(resultat.score2);
                            joueurActuel=changerTour(joueurActuel);
                            alert(nomJ1+", c'est à vous maintenant");
                        }
                    }

                    //Fin du jeu 
                    if((resultat.score1==nbCase*4)||(resultat.score2==nbCase*4)){
                        alert("Un joueur a gagné");
                    }
                });
            });
        }

        // recommencer = document.getElementById("recommencer");
        // recommencer.addEventListener("click",()=>{
        //     console.log("recommencer");
        //     // blocACacher = this.parentNode.querySelector("#page3");
        //     // blocACacher.style.display="none";
        //     // page2.style.display="block"; 
        //     //Mbola tsy mety
        // })
    })
})