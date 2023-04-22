import { evaluate } from 'mathjs'

export const Calbisection = (Equation, xl, xr) => {
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
    let data = []
    let X = 0
    var xm,fxm,fxr,ea;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj={};
    do
    {
        xm = (xl+xr)/2.0;
        fxr = evaluate(Equation, {x:xr})
        fxm = evaluate(Equation, {x:xm})

        iter ++;
        if (fxm*fxr > 0)
        {
            ea = error(xr, xm);
            obj = {
                iteration:iter,
                Xl:xl,
                Xm:xm,
                Xr:xr
            }
            data.push(obj)
            xr = xm;
        }
        else if (fxm*fxr < 0)
        {
            ea = error(xl, xm);
            obj = {
                iteration:iter,
                Xl:xl,
                Xm:xm,
                Xr:xr
            }
            data.push(obj)
            xl = xm;
        }
    }while(ea>e && iter<MAX)
    X = xm
    return{datanew: data, xnew: X}
}