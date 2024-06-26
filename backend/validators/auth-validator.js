// ? await schema. parseAsync(req.body) is the line where you use Zod to validate the request body data against the defined schema.


// Given any Zod schema, you can call its `.parse` method to check `data` is valid. If it is, a value is returned with full type information ! Otherwise, an error is thrown.

const z=require('zod')

// creating an object schema for the signup
const signupSchema=z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be at least of 3 charathers"})
    .max(255,{message:"Name must not be at most of 255 charathers"}),

    email:z
    .string({required_error:"Email is required"})
    .trim()
    .min(3,{message:"Email must be at least of 3 charathers"})
    .max(255,{message:"Email must not be more than 255 charathers"}),

    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"Phone must be at least of 10 charathers"})
    .max(20,{message:"Phone must not be at more than 20 charathers"}),

    password:z
    .string({required_error:"Password is required"})
    .trim()
    .min(7,{message:"Password must be at least of 6 charathers"})
    .max(1024,{message:"Password can't be greater than 1024 charathers"}),

})



module.exports = { signupSchema };