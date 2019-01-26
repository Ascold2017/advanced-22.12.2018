import apiRequest from '@modules/apiRequest';

const authorization =  (signInForm) => {
    
    //Getting input tags
    let loginInput = signInForm.querySelector('#user-login'),
        passwordInput = signInForm.querySelector('#user-password'),
        checkNoRobot = signInForm.querySelector('#user-check-1'),
        radioNoRobot = signInForm.querySelectorAll('input[name="check_second"]'),
        validLogin = false,
        validPassword = false,
        notRobot = false;

    function inputValidation(input) {

        //Get icon from this input
        let icon = input.parentElement.querySelector('.login-input__icon');

        //If input is empty
        if(input.value.length === 0){
            
            icon.classList.add('login-input__icon_danger');
            return false;
        } 
        //If valid
        else if (input.value.length > 0){ 
            
            icon.classList.add('login-input__icon_success');
            return true;
        } 
        //If typing
        else {
        
            icon.classList.remove('login-input__icon_danger');
            icon.classList.remove('login-input__icon_success');
            return false;
        }
    }

    //Submit data to server by ajax
    function submitForm(){

        let data = {
            name: loginInput.value,
            password: passwordInput.value,
        };

        console.group('Data for send on server');
        console.log('Name', data.name);
        console.log('Password', data.password);
        console.groupEnd();
        
        apiRequest({ url: '/login', method: 'POST', data })
        .then((data) => {
            // save token and calculated date of expire token
            localStorage.setItem('token_data', JSON.stringify({ token: data.token, expired_at: Date.now() + data.ttl * 1000 }));
            window.location.href = '/admin';
        })
        
    }

    //Apply input event to inputs
    signInForm.addEventListener('input', e => {
        e.target === loginInput ? validLogin = inputValidation(loginInput) : null;
        e.target === passwordInput ? validPassword = inputValidation(passwordInput) : null;
    });

    signInForm.addEventListener('click', () => {
        // if checkbox and radiobutton check true
        notRobot = checkNoRobot.checked && radioNoRobot[0].checked
    });

    signInForm.addEventListener('submit', (e) => {

        e.preventDefault();
        let errorMessages = [];
        !validLogin ? errorMessages.push('Вы не ввели логин') : null ;
        !validPassword ? errorMessages.push('Вы не ввели пароль') : null;
        !notRobot ? errorMessages.push('Подвердите, что вы человек') : null;

        if(errorMessages.length) {
            let errorText = `Ошибки: ${errorMessages.join(', ')}.`;
            alert(errorText);
        } else {
            submitForm();
        }
    });

    //If reset, inputs clear auto, icons must reset manually
    signInForm.addEventListener('reset', () => {
        let icons = document.querySelectorAll('.login-input__icon');
        icons.forEach(icon => {
            icon.classList.remove('login-input__icon_danger');
            icon.classList.remove('login-input__icon_success');
        });
    });
   
};

export default authorization;