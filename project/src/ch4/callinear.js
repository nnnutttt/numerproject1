import { pow, inv, multiply, sum } from 'mathjs';

export const CalLinear=(x, fx, n)=>{
    let mA=[], mAinv=[], mB=[], mX=[], gx=[], outputA=[];

    console.log(x, fx)

    var sumx=0, sumx2=0, sumy=0, sumxy=0;
    sumx = sum(x);
    sumy = sum(fx);
    for(let i=0;i<n;i++){
       sumx2 += pow(x[i],2);
       sumxy += x[i]*fx[i];
    }
    console.log("sumx",sumx)
    console.log("sumy = ",sumy)
    console.log("sumx2 = ",sumx2)
    console.log("sumxy = ",sumxy)

    mA = [[n, sumx],[sumx, sumx2]]
    mAinv = inv(mA)

    mB = [sumy, sumxy]
    mX = multiply(mAinv, mB)

    console.log("ma = ",mA)
    console.log("mb = ",mB)
    console.log("mx = ",mX)
    console.log("mAinv = ",mAinv)

    for(let i=0;i<n;i++){
        gx[i] = mX[0]+(mX[1]*x[i]);
        console.log(gx[i])
    }
    outputA.push({mX, gx})
    console.log(gx, outputA)
    return{gxnew: gx, outputAnew:outputA}
}