///import { UrlPath } from './UrlPath.js'
//import { WalletManager } from './WalletManager.js'
import { RequestDel } from './RequestDel.js'
import { RequestGet } from './RequestGet.js'
import { RequestPost } from './RequestPost.js'
import { RequestPut } from './RequestPut.js'
//import { RequestPut } from './RequestPut.js'

export class TransactionManager {

    constructor(wallet_id,categories,members) {
        this.initialiting(wallet_id,categories,members)
    }
    
    static async init(wallet_id) {
        const categories = await RequestGet.getCategories()
        const members = await RequestGet.getMembers(wallet_id)
        return new TransactionManager(wallet_id, categories, members)
    }
    
    initialiting(wallet_id,categories,members){
        TransactionManager.fillCategorySelector(categories)
        TransactionManager.fillMembersSelector(members)
        TransactionManager.fillParticipantsSelector(members)
        
        
    }


    static fillMembersSelector(members) {
        const payersSelector = document.querySelector('#payers-selector')
        document.querySelector("#payers-selector").innerHTML = ""
        const fragment = document.createDocumentFragment()
        members.forEach(members => {
            const option = document.createElement('option')
            option.id = members.user_id
            option.value = members.user_id
            option.text = members.nickname
            fragment.appendChild(option)
        })
        
        payersSelector.append(fragment)
        
    }

    static fillParticipantsSelector(members) {
        const participants = document.getElementById('participants-selector').value
        const participantsSelector = document.querySelector('#participants-selector')
        document.querySelector("#participants-selector").innerHTML = ""
        members.forEach(participant => {
            participantsSelector.innerHTML += `
            <input id=${participant.user_id} name="${participant.nickname}" type="checkbox" value= ${participant.user_id}>${participant.nickname}</input>
            `
        })
         if (participants == "Todos"){
           members.forEach(participantCheck => {
            document.querySelector('#participants-selector > [name="' + participantCheck.nickname + '"]').checked = true
                
        })
        }else {
        participants.forEach(participantCheck => {
           document.querySelector('#participants-selector > [name="' +  participantCheck + '"]').checked = true
        
        })
       }

    }

    static fillCategorySelector(category) {
        const categorySelector = document.querySelector('#category-selector')
        document.querySelector("#category-selector").innerHTML = ""
        const fragment = document.createDocumentFragment()
        //category.unshift({ id:5,category: "Varios"})
        category.forEach(categories => {
            const option = document.createElement('option')
            option.value = categories.category
            option.text= categories.category
            fragment.appendChild(option)
        })
        
        categorySelector.append(fragment)
        
    }


    static async editCategory() {
        const categories = await RequestGet.getCategories()
        document.getElementById('category-edit-group').classList.remove('hidden')
        //document.getElementById('editwallet').classList.remove('hidden')
        document.getElementById('category-edit-selector').innerHTML = ""
        const categoriesSelector = document.getElementById('category-edit-selector')
        categories.forEach(category => {
            categoriesSelector.innerHTML += `
                <div id="GroupCategory${category.id}" class="GroupCategory"  data-category-id="${category.id}">
                <button id="buttonDelCat${category.id}" class="mini-button">&#10062;</button>

                <input type="text" id="Category${category.id}" value="${category.category}"></input>
                
                <button id="buttonEditCat${category.id}" class="mini-button">&#9989;</button>
                </div>
            `
        })
        document.querySelectorAll(".GroupCategory").forEach(function(element) {
            const category_id = element.dataset.categoryId
            const category_old = document.querySelector("#Category" + category_id).value
            document.querySelector("#buttonDelCat" + category_id).addEventListener('click', () => {
                document.querySelector("#GroupCategory" + category_id).classList.add("hidden")
                RequestDel.delCategory(category_id)
            })
            document.querySelector('#buttonEditCat'+ category_id).addEventListener('click', () => {
                document.getElementById('Category' + category_id).classList.add('changeInput')
                const category_new = document.querySelector("#Category" + category_id).value
                RequestPut.editCategory(category_old,category_new)
            })
        })


        console.log("editCategory")
    }

    static async addTransac(selectedWalletId) {
        var description_value = document.getElementById('description_add').value;
        var amount_value = document.getElementById('amount_add').value;
        var selectedCategory_add = document.querySelector('#category-selected').value;
        var checked = document.querySelectorAll('#participants-selector :checked');
        const selectedParticipant_add = [...checked].map(option => option.value);
        var selectedPayer_add = document.querySelector('#payers-selector').value;
        const dateMember_add = document.querySelector('#adddate-selector').value;
        const transaction_add =         {
            category: selectedCategory_add,
            description: description_value,
            amount: amount_value,
            user_id: selectedPayer_add,
            date: dateMember_add,
            wallet_id: selectedWalletId,
            participants: selectedParticipant_add
        }
        TransactionManager.saveCategory(selectedCategory_add)
        const validate = TransactionManager.validateParticipants(selectedParticipant_add)
        if (validate === true ){
            const request = await RequestPost.postTransaction(transaction_add)
            TransactionManager.initTransaction(0,selectedWalletId)
            return request }
    }


   static async initTransaction(transac_id,selectedWalletId){
        TransactionManager.init(selectedWalletId)
        const transactionData = await RequestGet.getTransaction(transac_id)
        transactionData.forEach(transaction => {
            document.getElementById('amount_add').value = transaction.amount
            document.getElementById('description_add').value = transaction.description
            document.getElementById('participants-selector').value = transaction.participants
            document.getElementById('category-selected').value = transaction.category
            document.getElementById('transac_id').value = transac_id
            document.getElementById('adddate-selector').value = transaction.date
            
    })}

    static async editTransac(selectedWalletId) {
            var transac_id = document.getElementById('transac_id').value;
            var description_value = document.getElementById('description_add').value;
            var amount_value = document.getElementById('amount_add').value;
            var selectedCategory_add = document.querySelector('#category-selected').value;
            var checked = document.querySelectorAll('#participants-selector :checked');
            const selectedParticipant_add = [...checked].map(option => option.value);
            var selectedPayer_add = document.querySelector('#payers-selector').value;
            const dateMember_add = document.querySelector('#adddate-selector').value;
            //const wallet_id = document.querySelector('#wallet-selector').value;
            const transaction_add =         {
                id: transac_id,
                category: selectedCategory_add,
                description: description_value,
                amount: amount_value,
                user_id: selectedPayer_add,
                date: dateMember_add,
                wallet_id: selectedWalletId,
                participants: selectedParticipant_add
            }
            TransactionManager.saveCategory(selectedCategory_add)
            const validate = TransactionManager.validateParticipants(selectedParticipant_add)
            if (validate === true ){
                const request = await RequestPut.editTransaction(transaction_add)
                TransactionManager.initTransaction(0,selectedWalletId)
                return request 
            }
        console.log("editTransac")
    }

    static async saveCategory (category_selected){
        const categories = await RequestGet.getCategories()
        var categorys = []
        for(var i=0; i < categories.length; i++){
            let category = categories[i]["category"]
            categorys.push(category)}
        const resultado = categorys.includes(category_selected)
        if (resultado == false){
            RequestPost.postCategory(category_selected)
        }
        console.log("saveCategory")
    }


    static validateParticipants(selectedParticipants){
        if (selectedParticipants.length === 0) {
            alert('Debe seleccionar al menos un participante')
            return false
        } else return true
    }

    static async delTransaction(selectedWalletId){
        var transac_id = document.getElementById('transac_id').value;
        const transactionData = await RequestGet.getTransaction(transac_id)
        const description = transactionData[0]["description"]  
        const amount = transactionData[0].amount
        var mensaje
        var opcion = confirm("¿Seguro que quieres Borrar la transacción de (" + description + " con un valor de " + amount + "€) ?");
        if (opcion == true) {
            RequestDel.delTransac(transac_id)
            document.getElementById('transac_id'+transac_id).className='hidden'
        } 
    }


    static exitTransaction(){
        document.getElementById('description_add').value="";
        document.getElementById('amount_add').value="";
        document.querySelector('#category-selected').value="";
        document.querySelector('#payers-selector').value="";
    }

    static dateTimeNow() {
        var now = new Date()
        //var date = now.getDate() + '/' + ( now.getMonth() + 1 ) + '/' + now.getFullYear()
        var date = now.getFullYear() + '/' + ( now.getMonth() + 1 ) + '/' + now.getDate()
        var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
        var date_time = date + ', ' + time
        return date_time
    }

    static changeDate(){
        document.querySelector("#adddate-selector").classList.add("hidden")
        document.querySelector("#button-date").classList.add("hidden")
        document.querySelector("#form_datetime").classList.remove("hidden")
        document.querySelector("#form_datetime").addEventListener('change', () => {
            let valor = document.querySelector("#form_datetime").value
            valor = valor.replace(/-/g, '/')
            valor = valor.replace(/T/g, ', ')
        document.querySelector("#adddate-selector").value = valor
        document.querySelector("#adddate-selector").classList.remove("hidden")
        document.querySelector("#form_datetime").classList.add("hidden")
        document.querySelector("#button-date").classList.remove("hidden")
    })
    }

    }






