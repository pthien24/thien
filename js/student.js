// localStorage.setItem('studens', 'nguyen van a')
// localStorage.getItem('students')
// console.log(localStorage.getItem('studens'))

function emailisvalid(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
function save(){
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value; 
    let address = document.getElementById('address').value;
    let gender = '';
    if(document.getElementById('male').checked){
        gender = document.getElementById('male').value;
    }else if (document.getElementById('famale').checked){
        gender = document.getElementById('famale').value;
    }

        
    if(_.isEmpty(fullname)){
        fullname ='';
        document.getElementById('fullname-error').innerHTML= 'Vui lòng nhập họ tên!!'
    }else if(fullname.trim().length <= 2){
        fullname ='';
        document.getElementById('fullname-error').innerHTML= 'khong duoc nho ho 2 '
    }else if(fullname.trim().length > 50){
        fullname ='';
        document.getElementById('fullname-error').innerHTML= 'khong duoc lon hon 50'
    }
    else{
        document.getElementById('fullname-error').innerHTML= ''
    }

    if(_.isEmpty(email)){
        email = '';
        document.getElementById('email-error').innerHTML= 'Vui lòng nhập emaill cua ban'

    }else if(!emailisvalid(email)){
        email = '';
        document.getElementById('email-error').innerHTML= 'email khong dung dinh dang'
    
    }else {
        document.getElementById('email-error').innerHTML= ''

    }
    if (_.isEmpty(phone)){
        phone = '';
        document.getElementById('phone-error').innerHTML= 'vui long nham so dien thoai'

    } else if(phone.trim().length > 10){
        phone = '';
        document.getElementById('phone-error').innerHTML= 'so dien thoai khong hop le'
    }else {
        document.getElementById('phone-error').innerHTML= ''
    }

    if ( _.isEmpty(address)){
        address = '';
        document.getElementById('address-error').innerHTML= 'vui long nhap dia chi'
        
    }else {
        document.getElementById('address-error').innerHTML= ''

    }
    if(_.isEmpty(gender)){
        gender = '';
        document.getElementById('gender-error').innerHTML= 'vui long chon gioi tinh'

    }else {
        document.getElementById('gender-error').innerHTML= ''

    }
    if (fullname && email && phone && address && gender){
        // luu vao 
        // console.log(fullname , email,phone , address , gender)

        let students  =localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];  
        students.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender
        });
        localStorage.setItem('students', JSON.stringify(students));
        this.renderListstudents();


    }


}
function renderListstudents(){
    let students  =localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];  
    if(students.length === 0 ){
        document.getElementById('list-student').style.display = 'none';
        return false;
    } 
    document.getElementById('list-student').style.display = 'block';

    
    let tableContent = `<tr>
    <td>#</td>
    <td>Họ Và Tên</td>
    <td>Địa Chỉ email</td>
    <td>Số Điện Thoại</td>
    <td>Giới Tính</td>
    <td>Địa Chỉ</td>
    <td>Hành Động</td>
    </tr>`;
    students.forEach((student,index) => {
        let studensID = index;
        index++;
        let genderLabel = parseInt( student.gender) === 1    ?'Nam' :'Nu' ;
        tableContent += `<tr>
        <td>${index}</td>
        <td>${student.fullname}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${genderLabel}</td>
        <td>${student.address}</td>
        <td>

            <a href='#'>Edit</a> |  <a href='#' onclick='deleteStudents(${studensID})'>Delete</a>
        </td>


    </tr>`;
    })
    document.getElementById('grid-students').innerHTML = tableContent;

}
function deleteStudents(id){
    let students  =localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];  
    students.splice(id,1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListstudents();
}