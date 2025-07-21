1
import React from "react";
2
import UI_IMG from "../../assets/images/auth-img.png";
3
4
const AuthLayout = ({ children }) = {
5
6
7
8
9
return <div className="flex">
<div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
<h2 className="text-lg font-medium text-black">Task Manager</h2>
{children)
</div>
10
11
div className="hidden md: flex w-[40vw]
12
<img src={UI_IMG} className="" />
13
</div>
14
</div>
15
};
16
17
export default AuthLayout;
18