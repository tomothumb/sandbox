
function sample1(){
    console.log(1);
}
function sample2(){
    console.log(2);
}
function sample3(){
    console.log(3);
}
sample1();
sample2();
sample3();


function promiss_resolve(){
    return new Promise((resolve, reject) => {
        resolve('resolve!!');
    });
}
function promiss_reject(){
    return new Promise((resolve, reject) => {
        reject('reject!!');
    });
}


console.log(promiss_resolve());
// console.log(promiss_reject()); // ERROR


async function async_resolve(){
    return 'async fn resolve!!';
}
async function async_reject(){
    throw new Error('async fn reject!!');
}

async_resolve().then(val => {
    console.log("async resolve");
}).catch(err => {
    console.log(err); // => reject!!
});
async_reject().then(val => {
    console.log("success async reject");
}).catch(err => {
    console.log("err"); // => reject!!
    // console.log(err); // => reject!!
});

function multiple_Resolve(value){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(value * 2)
        }, 1000);
    });
}

async function async_await_sample(){
    const result = await multiple_Resolve(10);
    return result + 5;
}

async_await_sample().then(result => {
    console.log(result);
}).catch(err => {
    console.log("err");
    console.log(err);
});


function async_promise_pipe(){
    let result = 0;

    return multiple_Resolve(5)
        .then(val => {
            result += val;
            console.log(result);
            return multiple_Resolve(10);
        })
        .then(val => {
            result += val;
            console.log(result);
            return multiple_Resolve(20);
        })
        .then(val => {
            result += val;
            console.log(result);
            return result;
        });
}

async function async_await_pipe(){
    const a = await multiple_Resolve(5);
    const b = await multiple_Resolve(10);
    const c = await multiple_Resolve(20);
    return a + b+ c;
}
async function async_await_forloop(){
    for(let i=0; i<5; i ++){
        const result = await multiple_Resolve(i);
        console.log(result);
    }
    return "DONE LOOP";
}

async_promise_pipe().then(val => {
    console.log(val);
});
async_await_pipe().then(val => {
    console.log(val);
});
async_await_forloop().then(val => {
    console.log(val);
});


function async_promise_parallel(){
    const promiseA = multiple_Resolve(5);
    const promiseB = multiple_Resolve(10);
    const promiseC = promiseB.then(value => {
        console.log("promiceC",value);
        return multiple_Resolve(value);
    });
    const promiseD = multiple_Resolve(10);
    const promiseE = multiple_Resolve(20);
    const promiseF = multiple_Resolve(30);
    const promiseG = multiple_Resolve(40);
    const promiseH = multiple_Resolve(50);
    const promiseI = multiple_Resolve(60);
    const promiseJ = multiple_Resolve(70);

    return Promise.all([promiseA, promiseB, promiseC,
        promiseD, promiseE, promiseF, promiseG, promiseH, promiseI, promiseJ])
        .then(([a,b,c,d,e,f,g,h,i,j]) => {
            return [a,b,c,d,e,f,g,h,i,j];
        });
}
async_promise_parallel().then(([a,b,c,d,e,f,g,h,i,j]) => {
    console.log("async_promise_parallel",a,b,c,d,e,f,g,h,i,j);
});


async function async_await_parallel(){
    const [a,b,c,d,e,f,g,h,i] = await Promise.all([
        multiple_Resolve(5),
        multiple_Resolve(10),
        multiple_Resolve(20),
        multiple_Resolve(30),
        multiple_Resolve(40),
        multiple_Resolve(50),
        multiple_Resolve(60),
        multiple_Resolve(70),
        multiple_Resolve(80),
    ]);
    const j = await multiple_Resolve(i);
    return [a,b,c,d,e,f,g,h,i,j];
}
async_await_parallel().then(([a,b,c,d,e,f,g,h,i,j]) => {
    console.log("async_await_parallel",a,b,c,d,e,f,g,h,i,j);
});


async function async_map_parallel(){
    const array = [5,10,20];
    const promiseAll = await Promise.all(array.map(async(value) =>{
        return await multiple_Resolve(value);
    }));

    return promiseAll;
}
async_map_parallel().then(([a,b,c]) => {
    console.log("async_map_parallel",a,b,c);
});


// Error
function throw_error(){
    return new Promise((resolve,reject) => {
       setTimeout(function () {
           try{
               throw new Error("Throw Error.");
               resolve("No Error");
           }catch (e) {
               reject(e);
           }
       },5000)
    });
}

function promise_error_handleing() {
    return throw_error()
        .then((result) => {
            return result;
        }).catch((err) => {
            throw err;
        });
}

promise_error_handleing().then((result) => {
    console.log("promise_error_handleing Success",result);
}).catch((err) => {
    console.error("promise_error_handleing Error",err);
});

async function async_error_handling() {
    try{
       const result = await throw_error();
       return result;
    }catch(err){
        throw err;
    }
}
async_error_handling().then(result => {
    console.log("async_error_handling Success", result);
}).catch(err => {
    console.error("async_error_handling Error", err);
});

async function async_error_handling_simple() {
    const result = await throw_error();
    return result;
}
async_error_handling_simple().then( result => {
    console.log("async_error_handling_simple Success", result);
}).catch( err => {
    console.error("async_error_handling_simple Error", err);
});