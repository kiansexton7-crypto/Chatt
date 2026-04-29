const firebaseConfig = {
 apiKey:"AIzaSyBi-PMbrCNrTD4Sci2DYj716ewQaxIqJ4k",
 authDomain:"ubgpro.firebaseapp.com",
 projectId:"ubgpro",
 storageBucket:"ubgpro.firebasestorage.app",
 messagingSenderId:"915266692059",
 appId:"1:915266692059:web:699879598f8d9ad96cbdfe"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const authScreen = document.getElementById("auth-screen");
const chatScreen = document.getElementById("chat-screen");
const messagesDiv = document.getElementById("messages");

function register(){
let email=document.getElementById("email").value;
let pass=document.getElementById("password").value;

auth.createUserWithEmailAndPassword(email,pass)
.then(()=>alert("Account Created"))
.catch(e=>alert(e.message));
}

function login(){
let email=document.getElementById("email").value;
let pass=document.getElementById("password").value;

auth.signInWithEmailAndPassword(email,pass)
.catch(e=>alert(e.message));
}

function logout(){
auth.signOut();
}

auth.onAuthStateChanged(user=>{
if(user){
authScreen.classList.add("hidden");
chatScreen.classList.remove("hidden");
loadMessages();
}
else{
authScreen.classList.remove("hidden");
chatScreen.classList.add("hidden");
}
});

function sendMessage(){

let input=document.getElementById("messageInput");
let text=input.value.trim();

if(!text) return;

db.collection("globalChat").add({
uid:auth.currentUser.uid,
email:auth.currentUser.email,
text:text,
time:firebase.firestore.FieldValue.serverTimestamp()
});

input.value="";
}

function loadMessages(){

db.collection("globalChat")
.orderBy("time")
.onSnapshot(snapshot=>{

messagesDiv.innerHTML="";

snapshot.forEach(doc=>{

let msg=doc.data();

messagesDiv.innerHTML += `
<div class="message">
<b>${msg.email}</b><br>
${msg.text}
</div>
`;

});

messagesDiv.scrollTop=messagesDiv.scrollHeight;

});

}
