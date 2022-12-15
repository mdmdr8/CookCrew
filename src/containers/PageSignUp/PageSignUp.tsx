import React, { FC } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonCircle from "shared/Button/ButtonCircle";
import {Button} from "reactstrap";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
const [userJoin, setUserJoin] = useState({ password:'', id:'', email:'', nickname:''})

  // ID의 정규식 표현:4~16자의 영문 대소문자, 숫자와 특수기호(_),(-)만 사용가능합니다.
const [id, setId] = useState('');
const [validId, setValidId] = useState(false);


  //  입력 핸들링
const setInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserJoin({ ...userJoin, [name]: value });
  }

const ID_REG = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;

useEffect(() => {
    const result = ID_REG.test(id);
    setValidId(result);
}, [id])

  // const handleInputUser = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  // }

const setIdInfo = (e:  React.ChangeEvent<HTMLInputElement>) => {
  let id = e.target.value;
  setUserJoin({ ...userJoin, 'id': id });
  console.log(userJoin.id)
  setId(id);
  const reg = new RegExp(ID_REG);
  let checkReg = reg.test(id) ? true : false;

  if (checkReg) {
    console.log("정규표현식 일치");
    document.getElementById("regTrue")?.setAttribute("style", "display:show; color: blue;")
    document.getElementById("regFalse")?.setAttribute("style", "display:none; color: red;")
  }
  if (!checkReg) {
    console.log("정규표현식 불일치")
    document.getElementById("regFalse")?.setAttribute("style", "display:show; color: red;")
    document.getElementById("regTrue")?.setAttribute("style", "display:none; color: blue;")
  }
} 



const checkId = ( e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(id);
    formData.append('id', id)
    axios.post('/signup', formData)
        .then((res) => {
            if (res.data == false) {
                alert("사용 가능한 아이디 입니다.");
            }
            else if (res.data == true) {
                alert("중복되는 아이디 입니다.")
            }
        }).catch((error) => {
            // alert("중복되는 아이디 입니다.")
            console.log("Error")
        })

};

const submit = () => {
  //e.preventDefault();
  const formData = new FormData();
  formData.append('id', userJoin.id);
  formData.append('password', userJoin.password);
  formData.append('email', userJoin.email);
  formData.append('nickname', userJoin.nickname);

  console.log(userJoin.password)
  if(validId) {
    axios.post('/join', formData)
      .then((res) => {
          alert("회원 가입을 축하합니다.")

      }).catch((error) => {
          console.log("error")
      })
  }

}

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 " >

          {/* FORM */}
          {/* <form className="grid grid-cols-1 gap-6" onSubmit={submit}>//action="/login" method="post" */}
          <div className="grid grid-cols-1 gap-6" style={{width:"500"}}>
          {/* 이름 */}
            <label className="block">
              <p className="text-neutral-800 dark:text-neutral-200">
                Name
              </p>
              <Input
                type="text" style={{display:"inline-block", width:"350px"}}
                className="mt-1 name" name="nickname" id="nickname" placeholder="nickname" value={userJoin.nickname} onChange={setInfo} required/>
            </label>

          {/* 아이디 */}
            <label className="block">
              <p className="text-neutral-800 dark:text-neutral-200">
                ID
              </p>
              
              <Input type="text" style={{display:"inline-block", width:"350px"}} className="mt-1" name="id" id="id" placeholder="ID" value={userJoin.id} onChange={setIdInfo} required/>
              <Button className="primary" style={{display:"inline-block", float:"right", margin:"6px 0"}} onClick={checkId}>중복 확인</Button>

                <p>
                  <span id="regTrue" style={{ display: "none" }}><b>사용 가능한 아이디 입니다.</b></span>
                  <span id="regFalse" style={{ display: "none"}}><b>4~16자의 영문 대소문자, 숫자와 특수기호(_),(-)만 사용가능합니다.</b></span>
                </p>
            </label>
          
            <label className="block">
              <p className="text-neutral-800 dark:text-neutral-200">
                Password
              </p>
              <Input
                type="password" style={{display:"inline-block", width:"350px"}}
                className="mt-1" name="password" id="password" placeholder="password" value={userJoin.password} onChange={setInfo} required />
            </label>

            {/* <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                placeholder="recheck password"
                className="mt-1"
              /><br/>
              <span>
              <ButtonCircle>re</ButtonCircle>
              </span>
            </label> */}

            {/* <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                주소
              </span>
              <Input
                type="text"
                className="mt-1"
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                상세 주소
              </span>
              <Input
                type="text"
                className="mt-1"
              />
            </label> */}


            <label className="block">
              <p className="text-neutral-800 dark:text-neutral-200">
                Email
              </p>
              <Input
                type="email" style={{display:"inline-block", width:"350px"}}
                name="email" id="email" value={userJoin.email} onChange={setInfo} required
                placeholder="CookCrew@example.com"
                className="mt-1"
              />
              <Button className="primary" style={{display:"inline-block", float:"right", margin:"6px 0"}} onClick={checkId}>인증 번호</Button>

            </label>

            {/* <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                인증번호
              </span>
              <Input type="text" className="mt-1" />
            </label> */}

            <ButtonPrimary onClick={submit}>회원가입</ButtonPrimary>
          {/* </form> */}
          </div>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link className="text-green-600" to="/login">
              Sign in
            </Link>
          </span>
        </div> 
        {/* <Button className="primary" style={{display:"inline-block", float:"right", margin:"-378px 324px"}} onClick={checkId}>중복 확인</Button> */}
      </div>
    </div>
  );
};

export default PageSignUp;
