// Função que faz a conexão com o Firestore/Firebase
function fireSinc() {
   const email = ""; 
   const key = ''; 
   const projectId = ""; 
   var firestore = FirestoreApp.getFirestore (email, key, projectId); 

   return firestore;
}
// FIM.