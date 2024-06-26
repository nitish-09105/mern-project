// ? await schema. parseAsync(req.body) is the line where you use Zod to validate the request body data against the defined schema.

// Given any Zod schema, you can call its `.parse` method to check `data` is valid. If it is, a value is returned with full type information ! Otherwise, an error is thrown.

const validate=(schema)=>async(req,res,next)=>{  // schema is "signupSchema" from auth-validator
    try {
        const parseBody=await schema.parseAsync(req.body);
        req.body=parseBody;
        next();   // here we use zod for data validation in next() 
    } catch (err) {
        const status=422
        const message="Fill the input properly";
        const extraDetails=err.errors[0].message;

        const error={          // shows that what we are going to send in the error
            status,
            message,
            extraDetails,
        }
        console.log(error); 
        
    //  res.status(400).json({msg:message})

    next(error)  // send the error to the error-middleware for generating the response of error
    }
}

module.exports=validate;