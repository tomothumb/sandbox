
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
    console.log("async reject");
}).catch(err => {
    console.log(err); // => reject!!
});

