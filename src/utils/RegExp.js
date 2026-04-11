const regExp = {
    mailRegEx :  /^[0-9a-z]+(?:\.[0-9a-z]+)*@[ciaro]{5,}(?:\.[io]{2,})+$/gm,
    passwordRegex :/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
}

export default regExp