'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Manish Budhathoki',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements=function(movements,sort=false){
  containerMovements.innerHTML='';
  const movs=sort? movements.slice().sort((a,b)=>a-b):movements;
  movs.forEach(function(mov,i){
    const type=mov>0? 'deposit':'withdrawal';
    const html=`
      <div class="movements__row">
          <div class="movements__type movements__type--deposit">${i+1} ${type}</div>
          <div class="movements__value">${mov}💶</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin',html);
  })
}

const calcDisplayBalance=function(acc){
  const balance=acc.movements.reduce((acc,mov)=>acc+mov,0);
  acc.balance=balance; 
  labelBalance.textContent=`${balance}💶`;
   
} 

const calcDisplaySummary=function(acc){
  const incomes=acc.movements.filter(mov=>mov>0).reduce((acc,mov)=>acc+mov,0);
  labelSumIn.textContent=`${incomes}💶`;
  const outcomes=acc.movements.filter(mov=>mov<0).reduce((acc,mov)=>acc+mov,0);
  labelSumOut.textContent=`${Math.abs(outcomes)}💶`;
  const interest=acc.movements.filter(mov=>mov>0).map(deposit=>(deposit*acc.interestRate)/100).filter(int=>int>=1).reduce((acc,int)=>acc+int,0);
  labelSumInterest.textContent=`${interest}💶`;
}


//Creation of  userName
const createUserName=function(accs){
  accs.forEach(function(acc){
   acc.username=acc.owner.toLowerCase().split(' ').map((name)=>name[0]).join('');
  })
  
};
createUserName(accounts);
const updateUI=function(acc){
  //Display movements
  displayMovements(acc.movements);
  //Display Balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};
///EVENT HANDLERS
let currentAccount; 
btnLogin.addEventListener('click',function(e){
  //PREVENT FORM FROM SUBMITTING
  e.preventDefault();
  currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value);
  // console.log(currentAccount);
  if(currentAccount?.pin===Number(inputLoginPin.value)){
    console.log('Login!');
    //Display UI and message
    labelWelcome.textContent=`Welcome Back,${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity=100;
    //clearInput Fields
    inputLoginUsername.value=inputLoginPin.value='';
    inputLoginPin.blur();
    updateUI(currentAccount);
    
  }
});
//LOAN FUNTIONALITTY
btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount=Number(inputLoanAmount.value);
  
  if(amount>0 && currentAccount.movements.some(mov=>mov>=amount*0.1)){
    //Add movement
    currentAccount.movements.push(amount);
    //update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value='';
});
//FOR TRANSFER FUNCTIONALITY
btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const receiverAcc=accounts.find(acc=>acc.username===inputTransferTo.value);
  inputTransferAmount.value=inputTransferTo.value='';
  if(amount>0 && currentAccount.balance>=amount && receiverAcc?.username!==currentAccount.username){
    //For Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //Update UI
    updateUI(currentAccount);
  }
});
btnClose.addEventListener('click',function(e){
  e.preventDefault();
  console.log('DELETE');
  if(inputCloseUsername.value===currentAccount.username&& Number(inputClosePin.value)===currentAccount.pin){
    inputCloseUsername.value=inputClosePin.value='';
    const index=accounts.findIndex(acc=>acc.username===currentAccount.username);
    console.log(index);
    //Delete Account
    accounts.splice(index,1);
    //Hide UI
    containerApp.style.opacity=0;
  }
});
let sorted=false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted=!sorted;
})
  

/////LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.includes(-130));
// //CONDITION
// const anydeposits=movements.some(mov=>mov>500);
// console.log(anydeposits);
// //Every
// // console.log(account4.movements.every(mov=>mov>0));
// // const accountMovement=accounts.map(acc=>acc.movements);
// // console.log(accountMovement);
// // const allMovements=accountMovement.flat();
// // console.log(allMovements);
// // const sum=allMovements.reduce((acc,mov)=>acc+mov,0);
// // console.log(sum);
// const sum=accounts.map((acc)=>acc.movements).flat().reduce((acc,mov)=>acc+mov,0);
// console.log(sum);
// const owners=['jonas','zach','adam','martha'];
// console.log(owners.sort());
// console.log(owners);
// //Numbers
// console.log(movements);
// console.log(movements.sort());
// movements.sort((a,b)=>{
//   if(a>b) return 1;
//   if(b>a) return -1;
// })
// console.log(movements);
