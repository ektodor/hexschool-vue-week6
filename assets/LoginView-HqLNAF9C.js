import{_ as l,o as c,c as m,e,i,v as d}from"./index-eej9M8hQ.js";var p={VITE_APP_URL:"https://ec-course-api.hexschool.io/v2",VITE_APP_API_NAME:"ektodorwang-api",BASE_URL:"/hexschool-vue-week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_URL:u}=p,_={data(){return{username:"",password:""}},methods:{login(){this.$http.post(`${u}/admin/signin`,{username:this.username,password:this.password}).then(t=>{const{token:s,expired:r}=t.data;document.cookie=`token=${s};expired=${new Date(r)}`,this.$router.push("/admin/products")}).catch(t=>{console.error(t),alert("登入失敗")})}}},h={class:"container"},f={class:"row justify-content-center"},w=e("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1),v={class:"col-8"},g={id:"form",class:"form-signin"},b={class:"form-floating mb-3"},x=e("label",{for:"username"},"Email address",-1),P={class:"form-floating"},E=e("label",{for:"password"},"Password",-1),k=e("p",{class:"mt-5 mb-3 text-muted"},"© 2021~∞ - 六角學院",-1);function V(t,s,r,A,n,a){return c(),m("div",h,[e("div",f,[w,e("div",v,[e("form",g,[e("div",b,[i(e("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"",autofocus:"","onUpdate:modelValue":s[0]||(s[0]=o=>n.username=o)},null,512),[[d,n.username]]),x]),e("div",P,[i(e("input",{type:"password",class:"form-control",id:"password",placeholder:"Password",required:"","onUpdate:modelValue":s[1]||(s[1]=o=>n.password=o)},null,512),[[d,n.password]]),E]),e("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"button",onClick:s[2]||(s[2]=(...o)=>a.login&&a.login(...o))}," 登入 ")])])]),k])}const D=l(_,[["render",V]]);export{D as default};
