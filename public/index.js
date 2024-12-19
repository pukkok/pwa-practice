/** *************************************** */

const root = document.getElementById('root')

const clickForm = document.createElement('form')
clickForm.method = "POST"
clickForm.action = "/click"

const input = document.createElement('input')
input.placeholder = "내용쓰자"
input.name = "test"

const button = document.createElement('button')
button.textContent = "클릭합시다"

const buttonTwo = document.createElement('button')
buttonTwo.textContent = '테스트 버튼'

clickForm.appendChild(input)
clickForm.appendChild(button)
root.append(clickForm, buttonTwo)

/** *************************************** */