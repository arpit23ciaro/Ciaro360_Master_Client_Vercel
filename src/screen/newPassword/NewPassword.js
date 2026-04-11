import React, { useEffect, useState } from "react";
import { fontSize, fontWeight, GlobleStyle } from "../../Style/GlobalStyle";
import { Box, Typography } from "@mui/material";
import logo from "../../assest/logo.png";
import CustomeInput from "../../component/CustomeInput";
import CustomeButton from "../../component/CustomeButton";
import regExp from "../../utils/RegExp";
import check from "../../assest/check.png";
import uncheck from "../../assest/shape (1).png";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [validPass, setvalidPass] = useState(false);

  const [confirmPass, setConfirmPass] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  useEffect(() => {
    passwordValidtion();
    passwordStrength();
  }, [password, confirmPass]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
    passwordValidtion();
  };

  const passwordValidtion = () => {
    if (password.match(regExp.passwordRegex)) {
      setvalidPass(true);
    } else if (password === "") {
      setvalidPass(null);
    } else {
      setvalidPass(false);
    }
  };

  // const cPassValidation = (value) => {
  //   if (value === password) {
  //     setPasswordMatch(true);
  //     console.log("true");
  //   } else {
  //     setPasswordMatch(false);
  //     console.log("object false");
  //   }
  // };
  const checkConfirmPass = (e) => {
    setConfirmPass(e.target.value);
  };

  const passwordStrength = () => {
    setValidLength(password.length >= 10 ? true : false);
    setUpperCase(password.toLowerCase() !== password);
    setLowerCase(password.toUpperCase() !== password);
    setHasNumber(/\d/.test(password));
    setPasswordMatch(
      password.length && confirmPass.length && password === confirmPass
    );
    setSpecialChar(/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
  };
  return (
    <GlobleStyle>
      <Box className="parent-container">
        <Box className="main-container" style={styles.extendedContainer}>
          <Box>
            <img src={logo} alt="logo" loading="lazy" />
          </Box>
          <Box>
            <Typography className="login-heading">
              Create New Password
            </Typography>
          </Box>
          <Box style={{ width: "100%" }}>
            <Box className="input-container">
              <CustomeInput
                label={"Enter new password"}
                name="new password"
                value={password}
                // type="password"
                changeHandler={handlePassword}
              />
              {/* <Box>
                {validPass === false ? (
                  <span className="error-msg">
                    Password contains min. 8 digit (1 uppercase, lowercase,
                    special character, number)
                  </span>
                ) : (
                  <></>
                )}
              </Box> */}
              <CustomeInput
                style={{ fontWeight: 300 }}
                label={"Confirm password"}
                name="confirm password "
                value={confirmPass}
                changeHandler={checkConfirmPass}
              />
              <Box>
                <div>
                  <ul>
                    {confirmPass === "" ? (
                      <></>
                    ) : (
                      <li>
                        <Box style={styles.listBox}>
                          <Typography>
                            Password & confirm password match?
                          </Typography>
                          {passwordMatch ? (
                            <img alt="Checked" src={check} />
                          ) : (
                            <img alt="Unchecked" src={uncheck} />
                          )}
                        </Box>
                      </li>
                    )}
                    <li style={styles.listLable}>
                      <Box style={styles.listBox}>
                        <Typography>Minimum password length is 10:</Typography>
                        {validLength ? (
                          <img alt="Checked" src={check} />
                        ) : (
                          <img alt="Unchecked" src={uncheck} />
                        )}
                      </Box>
                    </li>
                    <li style={styles.listLable}>
                      <Box style={styles.listBox}>
                        <Typography>
                          Password must contains atleast 1 number:
                        </Typography>
                        {hasNumber ? (
                          <img alt="Checked" src={check} />
                        ) : (
                          <img alt="Unchecked" src={uncheck} />
                        )}
                      </Box>
                    </li>
                    <li style={styles.listLable}>
                      <Box style={styles.listBox}>
                        <Typography>
                          Password contains 1 uppercase character:
                        </Typography>
                        {upperCase ? (
                          <img alt="Checked" src={check} />
                        ) : (
                          <img alt="Unchecked" src={uncheck} />
                        )}
                      </Box>
                    </li>
                    <li style={styles.listLable}>
                      <Box style={styles.listBox}>
                        <Typography>
                          Password contains 1 lowerCase character:
                        </Typography>
                        {lowerCase ? (
                          <img alt="Checked" src={check} />
                        ) : (
                          <img alt="Unchecked" src={uncheck} />
                        )}
                      </Box>
                    </li>
                    <li style={styles.listLable}>
                      <Box style={styles.listBox}>
                        <Typography>
                          Password contains 1 special character:
                        </Typography>
                        {specialChar ? (
                          <img alt="Checked" src={check} />
                        ) : (
                          <img alt="Unchecked" src={uncheck} />
                        )}
                      </Box>
                    </li>
                  </ul>
                </div>
              </Box>
              <CustomeButton label={"Continue"} path="/new_password" />
            </Box>
          </Box>
        </Box>
      </Box>
    </GlobleStyle>
  );
}

const styles = {
  extendedContainer: {
    height: "85vh",
  },
  listBox:{
    display: 'flex',
    alignItems: 'center'
  },
  // statusImg:{
  //   height:'16px',
  //   width:'10px'
  // },
  listLable: {
    // fontSize:fontSize.,
    // fontWeight:fontWeight.semibold
  },
};
// const [password, setPassword] = useState({
//   initialPassword: "",
//   secondPassword: ""
// });

// const [matchingPassword, setMatchingPassword] = useState(false);

// const inputChange = (event) => {
//   const { value, name } = event.target;

//   setPassword({
//     ...password,
//     [name]: value
//   });
// };

// useEffect(() => {

// }, [password, requiredPasswordLength]);

// return (
// <div>
//   <section>
//     <article>
//       <label htmlFor="initialPassword">First Password</label>
//     </article>
//     <article>
//       <input onChange={inputChange} name="initialPassword" type="text" />
//     </article>
//   </section>

//   <section>
//     <article>
//       <label htmlFor="secondPassword">Second Password</label>
//     </article>
//     <article>
//       <input onChange={inputChange} name="secondPassword" type="text" />
//     </article>
//   </section>

//   <ol>
//     <li>
//       Valid Length:{" "}
//       {validLength ? (
//         <span role="img" aria-labelledby="Smiling Face With Sunglasses">
//           &#128526;
//         </span>
//       ) : (
//         <span role="img" aria-labelledby="Neutral Face">
//           &#128528;
//         </span>
//       )}
//     </li>
//     <li>
//       Has a Number:
//       {hasNumber ? (
//         <span role="img" aria-labelledby="Smiling Face With Sunglasses">
//           &#128526;
//         </span>
//       ) : (
//         <span role="img" aria-labelledby="Neutral Face">
//           &#128528;
//         </span>
//       )}
//     </li>
//     <li>
//       UpperCase:
//       {upperCase ? (
//         <span role="img" aria-labelledby="Smiling Face With Sunglasses">
//           &#128526;
//         </span>
//       ) : (
//         <span role="img" aria-labelledby="Neutral Face">
//           &#128528;
//         </span>
//       )}
//     </li>
//     <li>
//       LowerCase:
//       {lowerCase ? (
//         <span role="img" aria-labelledby="Smiling Face With Sunglasses">
//           &#128526;
//         </span>
//       ) : (
//         <span role="img" aria-labelledby="Neutral Face">
//           &#128528;
//         </span>
//       )}
//     </li>
//     <li>
//       Match:
//       {matchingPassword ? (
//         <span role="img" aria-labelledby="Smiling Face With Sunglasses">
//           &#128526;
//         </span>
//       ) : (
//         <span role="img" aria-labelledby="Neutral Face">
//           &#128528;
//         </span>
//       )}
//     </li>
//     <li>
//       Special Character:
//       {specialChar ? (
//         <span role="img" aria-labelledby="Smiling Face With Sunglasses">
//           &#128526;
//         </span>
//       ) : (
//         <span role="img" aria-labelledby="Neutral Face">
//           &#128528;
//         </span>
//       )}
//     </li>
//   </ol>
// </div>
// );
