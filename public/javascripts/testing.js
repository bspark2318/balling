

[1,2,3,44,55,66,77].reduce( (p, _, i) =>
    p.then(_=> new Promise(resolve => 
        setTimeout(() => {
            console.log(i);
            resolve();
        }, Math.random() * 1000 )
        )), Promise.resolve()); 
