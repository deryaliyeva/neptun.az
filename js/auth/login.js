import { login } from "../../services/api.js";
const passwordInp = document.getElementById('passwordInp')
const emailInp = document.getElementById('emailInp')
const btn = document.getElementById('btn')

window.giris = () => {
    if(emailInp.value.trim() == "" || passwordInp.value.trim() == "") return alert('Xanalari doldurun sizin yerinize men yazasi doulemm!!')
    btn.disabled = true
    const obj = JSON.stringify({
        login: emailInp.value,
        password: passwordInp.value
    })
    login(obj).then(res => {
        console.log(res)
        if (res.error) {
            emailInp.value = ''
            passwordInp.value = ''
            return alert('E-mail ve ya parol yanlisdir')
        }
        if (res.status) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('status', res.status);
            location.href = '/admin/admin.htm'
        }
    })
    .finally(f=>{
        btn.disabled=false
    })
}
window.cixiset=()=>{
    localStorage.removeItem('token', res.token);
    localStorage.removeItem('status', res.status);
    location.href='/index.htm'
}