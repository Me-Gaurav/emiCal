const validation = (values) =>{
    const errors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(values.name === ''){
        errors.name = "Username is required!"
    }
    if(values.email === ''){
        errors.email = "Email is required!"
    } else if (!emailPattern.test(values.email)){
        errors.email = 'Invalid email format'
    }
    if(values.password === ''){
        errors.password = "Password is required!"
    } else if (values.password.length < 8){
        errors.password = 'Password should contains minimum 8 characters'
    } else if (!passwordPattern.test(values.password)){
        errors.password = 'Password should contain a numeric value and an uppercase letter'
    }
    if(values.confirmPassword === ''){
        errors.confirmPassword = "Please confirm your password!"
    } else if (values.confirmPassword !== values.password){
        errors.confirmPassword = `Password didn't matched `
    }
    return errors 
}

export default validation