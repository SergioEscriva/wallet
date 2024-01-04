import { RequestDel } from './RequestDel.js'
import { RequestGet } from './RequestGet.js'
import { RequestPost } from './RequestPost.js'
import { RequestPut } from './RequestPut.js'
import { TransactionManager } from './TransactionManager.js'
//import { UserManager } from './UserManager.js'

export class WalletManager {

    constructor() {
        this.domElements = {}
    }

    async init() {
        WalletManager.getDomElements()
        await WalletManager.permanentUserRead()
        const proprietary = document.querySelector("#name-proprietary").dataset.idProprietary
        const wallet_p = await RequestGet.getWallets(0)
        const wallets = await RequestGet.getWallets(proprietary)
        if (!wallets) return
        this.fillWalletsSelector(wallets, this.domElements.walletSelector, wallet_p)
        this.addListeners()
    }

    static getDomElements() {
        this.domElements = {
            walletSelector: document.querySelector('#wallet-selector'),
            walletGroup: document.querySelector('#wallets-group'),
            walletAddGroup: document.querySelector('#add-wallet-group'),
            buttonsAddWGroup: document.querySelector('#buttonsAddW-group'),
            buttonsEditWGroup: document.querySelector('#buttonsEditW-group'),
            transactionsGroup: document.querySelector('#transactions-group'),
            transactions: document.querySelector('#transactions'),
            addTransactionGroup: document.querySelector('#add-transaction-group'),
            buttonsGroup: document.querySelector('#buttons-group'),
            buttonsWGroup: document.querySelector('#buttonW-group'),
            buttonsAddGroup: document.querySelector('#buttonsAdd-group'),
            buttonsDivGroup: document.querySelector('#buttonsDiv-group'),
            buttonEditGroupWM: document.querySelector('#buttonEditWM-Group'),
            division: document.querySelector('#division-show'),
            editTransactionGroup: document.querySelector('#edit-transaction-group'),
            divisionGroup: document.querySelector('#division-group'),
            balance: document.querySelector('#balance'),
            walletName: document.querySelector('#walletName') 
        }
    }

    async fillWalletsSelector(wallets_data, algo, wallet_p) {
        const wallets_sel = WalletManager.domElements.walletSelector
        wallets_sel.innerHTML = ''
        if (wallets_data.length == 0){
            wallets_data = wallet_p
        }
        wallets_data.forEach(wallets => {
            if (wallets.description == null){
                wallets.description = "Sin descripción"
            }
            wallets_sel.innerHTML += `
            <div id="wallet" data-wallet-id="${wallets.id}" data-wallet="wallets">
            <div id="wallet_id${wallets.id}"  data-wallet="wallets" data-wallet-id="${wallets.id}" data-wallet-name="${wallets.name}" class="cuadriculaWallet">
                <div id="wallet-name-id-${wallets.id}">${wallets.name}</div>
                <div id="wallet-description-id-${wallets.id}" style="font-size: 10px">${wallets.description}</div>
            </div></div>`
        })
        console.log("fillWalletsSelector")
    }

    addListeners() {
        //Botones atras
        WalletManager.domElements.buttonsGroup.querySelector('#button-atras').addEventListener('click', () => { window.location.reload()})
        WalletManager.domElements.buttonsAddGroup.querySelector('#button-atras').addEventListener('click', () => { WalletManager.showTransac()})
        WalletManager.domElements.buttonsDivGroup.querySelector('#button-atras').addEventListener('click', () => { WalletManager.showTransac()})
        /// Botones On
        WalletManager.domElements.walletGroup.classList.remove('hidden')
        WalletManager.domElements.buttonsWGroup.querySelector('#button-add').addEventListener('click', () => { this.addWallet()  })
        WalletManager.domElements.buttonsWGroup.querySelector('#button-edit').addEventListener('click', () => { WalletManager.editWallet()  })
        document.getElementById("funtionMenu").addEventListener('click', () => {this.menuConfig()})
        WalletManager.domElements.buttonsGroup.querySelector('#button-division').addEventListener('click', () => { WalletManager.showDivision()  })
        document.querySelector("#button-date").addEventListener('click', () => {TransactionManager.changeDate()})
        document.querySelector('#buttonEditWallete-atras').addEventListener('click', () => {window.location.reload()})
        document.querySelector('#buttonEditWallete-category').addEventListener('click', () => {WalletManager.editCategoryShow()})
        document.querySelector('#buttonEditWallete-user').addEventListener('click', () => {WalletManager.editUser()})
        document.querySelector('#buttonEditW-atras').addEventListener('click', () => {window.location.reload()})
        console.log("addWallet")
        document.querySelector('#buttonEditWtras-atras').addEventListener('click', () => {
            window.location.reload()})
        /// Menú
        document.getElementById("menuCategorys").addEventListener('click', () => {WalletManager.editCategoryShow()})
        document.getElementById("menuUser").addEventListener('click', () => {WalletManager.editUser()})
        document.getElementById("menuSession").addEventListener('click', () => {
            localStorage.clear()
            document.location.href= "index.html"})
        document.getElementById("menuAbout").addEventListener('click', () => { document.getElementById("aboutText").classList.remove('hidden')})
        WalletManager.domElements.walletGroup.classList.remove('hidden')
        document.querySelectorAll("#wallet").forEach(function(element) {
            const wallet_id = element.dataset.walletId
            document.querySelector('#wallet_id'+ wallet_id).addEventListener('click', () => {
                WalletManager.selectedWalletId(wallet_id)
    })})
    console.log("addListeners")
   }

   static addListenersSelect(selectedWalletId,selectedWalletName){
    document.querySelector('#buttonWalletEdit-save').addEventListener('click', () => {WalletManager.editWalletName(selectedWalletName)})
    document.querySelector('#buttonWalletEdit-del').addEventListener('click', () => {WalletManager.delWallet(selectedWalletId,selectedWalletName)})
    document.querySelector("#buttonDelTransac").addEventListener('click', () => { TransactionManager.delTransaction(selectedWalletId)})
    WalletManager.domElements.buttonsAddGroup.querySelector('#button-save').addEventListener('click', () => { WalletManager.saveAddTransac(selectedWalletId)  })
    WalletManager.domElements.buttonsAddGroup.querySelector('#button-edit-save').addEventListener('click', () => { WalletManager.saveEditTransac(selectedWalletId)  })
    WalletManager.domElements.buttonsGroup.querySelector('#button-add').addEventListener('click', () => { this.showAddTransac(selectedWalletId)})
    console.log("addListenerSelect")
   }

   static selectedWalletId(wallet_id) {
        WalletManager.domElements.addTransactionGroup.classList.add('hidden')
        WalletManager.domElements.walletGroup.classList.add('hidden')
        const selectedWalletId = wallet_id
        const selectedWalletName = document.querySelectorAll('#wallet_id'+wallet_id)[0].firstElementChild.innerHTML
        const selectWall = WalletManager.domElements.walletName
        selectWall.innerHTML = ''
        WalletManager.domElements.walletName.innerHTML = `<div> Wallet ${selectedWalletName}</div>`
        WalletManager.domElements.transactionsGroup.classList.remove('hidden')
        WalletManager.domElements.buttonsGroup.classList.remove('hidden')
        this.addListenersSelect(selectedWalletId,selectedWalletName)
        WalletManager.transactionsList(selectedWalletId)
        console.log("selectedWalletId")
   }
   
    static async transactionsList(selectedWalletId) {
        const transactionsData = await RequestGet.getTransactions(selectedWalletId)
        if (transactionsData.length == 0) return  alert("No hay Transacciones, Añade una..."), this.showAddTransac(selectedWalletId)
        const balance = await RequestGet.getBalance(selectedWalletId)
        const balancemin = await RequestGet.getBalanceMin(selectedWalletId)
        const division =  await RequestGet.getDivision(selectedWalletId)
        const membersData = await RequestGet.getMembers(selectedWalletId)
        const transactions = WalletManager.domElements.transactions
        transactions.innerHTML = ''
        transactions.innerHTML += `
        <div id="transac_idid" title="0"><B>
        <div id="transac_id0" title="0" class="cuadricula">
            <div>Descripción</div>
            <div>Importe (€)</div>
            <div>Pagador</div>
            <div>Categoría</div>
            <div style="font-size: 10px">Participantes</div>
            <div>Fecha</div>
        </div></B></div>`
        transactionsData.forEach(transaction => {
            transactions.innerHTML += `
            <div id="transac_idid" title="${transaction.id}">
            <div id="transac_id${transaction.id}" title="${transaction.id}" class="cuadricula">
                <div>${transaction.description}</div>
                <div>${transaction.amount}€</div>
                <div>${transaction.name}</div>
                <div>${transaction.category}</div>
                <div style="font-size: 10px">${transaction.participants}</div>
                <div>${transaction.date}</div>
            </div></div>`
            console.log("transactionsList")
        })
        
        document.querySelectorAll("#transac_idid").forEach(function(element) {
            const transac_id = element["title"]
            document.querySelector('#transac_id'+transac_id).addEventListener('click', () => {WalletManager.showEditTransac(transac_id,selectedWalletId)})
       })

        const balanceElement = WalletManager.domElements.balance
        balanceElement.innerHTML = `
        <div class="cuadricula">
                <div>TOTAL:</div>
                <div><B>${balance.amount}€</B></div>
                <div>Debería Pagar: <B>${balancemin.member_id}</B></div>
                <div><B>Miembros: </B></div>`
            membersData.forEach(member => {
            balanceElement.innerHTML += `
                · ${member.nickname}`
            })
            
        const divisions = WalletManager.domElements.division
        divisions.innerHTML = ''
        WalletManager.domElements.division.innerHTML = `<div>${division}</div><hr/>`
        WalletManager.showTransac()
    }


    menuConfig(){
        
            var x = document.getElementById("myLinks")
            if (x.style.display === "block") {
              x.style.display = "none"
              document.getElementById("container").classList.remove('hidden')
              document.getElementById("aboutText").classList.add('hidden')
            } else {
              x.style.display = "block"
              document.getElementById("container").classList.add('hidden')
              document.getElementById("aboutText").classList.add('hidden')
            }
    }

    addWallet(){
        WalletManager.domElements.walletGroup.classList.add('hidden')
        WalletManager.domElements.walletAddGroup.classList.remove('hidden')
        WalletManager.domElements.walletAddGroup.querySelector('#buttonWallet-save').addEventListener('click', () => {this.addWalletNew()})
    }

    async addWalletNew(){
        const name_add = document.getElementById('name_add').value
        const proprietary_id = document.querySelector("#name-proprietary").dataset.idProprietary
        const proprietary_name = document.querySelector("#name-proprietary").dataset.nameProprietary
        const respuesta = await RequestPost.postWallet(name_add,proprietary_id)
        
        if (respuesta === false) {
            document.getElementById('name_add').classList.add('changeInputError')
        } else {
            WalletManager.domElements.walletAddGroup.classList.add('hidden')
            const name_edit = document.querySelector('#name_edit')
            const fragmentW = document.createDocumentFragment()
            const wallet = await RequestGet.getWalletToId(name_add)
            const selectedWalletId = wallet[0]["id"]
            const selectedWalletName = name_add
            await RequestPost.postMember(selectedWalletId,proprietary_name)
            document.getElementById('editwallet').classList.remove('hidden')
            document.getElementById('name_edit_group').classList.add('hidden')
            document.getElementById('group-edit-name-wallet').classList.remove('hidden')
            document.getElementById('edit-wallet-group').classList.remove('hidden')
            document.getElementById('name_edit_new').value = selectedWalletName
            await WalletManager.editWalletMembers(selectedWalletId)
        }
        console.log("addWalletNew")
    }

    static async editWallet (){
        document.getElementById('name_edit').innerHTML = ""
        const name_edit = document.querySelector('#name_edit')
        const fragmentW = document.createDocumentFragment()
        const proprietary = document.querySelector("#name-proprietary").dataset.idProprietary
        const wallets = await RequestGet.getWallets(proprietary)
        wallets.forEach(wallet => {
            const option = document.createElement('option')
            if (wallet.proprietary == proprietary){
                document.querySelector('#share').disabled = false
                option.value = wallet.id
                option.text = wallet.name
                option.dataset.description = wallet.description
                option.dataset.share = wallet.share
                fragmentW.appendChild(option)
            }
        })
        name_edit.append(fragmentW)

        document.getElementById('wallets-group').classList.add('hidden')
        document.getElementById('edit-wallet-group').classList.remove('hidden')
        document.querySelector('#name_edit').addEventListener('change', async (event) => {
            const selectedWalletId = event.target.value
            const selectedWalletName = event.target.selectedOptions[0].label
            const description = event.target.selectedOptions[0].dataset.description
            let shareWallet = event.target.selectedOptions[0].dataset.share
            if (shareWallet == 1){shareWallet = true}else{shareWallet = false}
            document.querySelector('#share').checked = shareWallet
            document.getElementById('description_wallet_edit').value = description
            document.getElementById('description_wallet_edit').addEventListener('change', async (event) => {
                WalletManager.addDescriptionWallet(selectedWalletId)
            })

            document.getElementById('name_edit_group').classList.add('hidden')
            document.getElementById('editwallet').classList.remove('hidden')
            document.getElementById('group-edit-name-wallet').classList.remove('hidden')
            document.getElementById('name_edit_new').value = selectedWalletName
            document.querySelector('#share').addEventListener('click', () => {WalletManager.shareWallet(selectedWalletId)})
            WalletManager.addListenersSelect(selectedWalletId,selectedWalletName)
            await WalletManager.editWalletMembers(selectedWalletId,selectedWalletName).reload
        })
        console.log("editWallet")
    }

    static async editWalletMembers (selectedWalletId){
        document.getElementById('membersEdit-selector').classList.remove('hidden')
        document.getElementById('editwallet').classList.remove('hidden')
        const members = await RequestGet.getMembers(selectedWalletId)
        document.getElementById('membersEdit-selector').innerHTML = ""
        const membersSelector = document.getElementById('membersEdit-selector')
        members.forEach(members => {
            membersSelector.innerHTML += `
            <div id='GroupMember${members.user_id}' class='GroupMember' data-member-id="${members.user_id}" data-member-name="${members.name}" data-member-nickname="${members.nickname}">
              
                <button id="buttonDel${members.user_id}" class="mini-button">&#10062;</button>

                <input type="text" id="Member${members.user_id}" value="${members.nickname}"></input>
               
                <button id="buttonEdit${members.user_id}" class="mini-button-hidden">&#9989;</button>
            </div>`
            const proprietary= document.querySelector("#name-proprietary").dataset.idProprietary
            if (members.user_id == proprietary){
            document.querySelector('#buttonEdit'+ members.user_id).classList.remove("mini-button-hidden")
            document.querySelector('#buttonEdit'+ members.user_id).classList.add("mini-button")
            }
        })
        document.querySelector('#newMemberWallet-save').addEventListener('click', () => {WalletManager.addMemberWalet(selectedWalletId)})

        document.querySelectorAll(".GroupMember").forEach(function(element) {
        const member_id = element.dataset.memberId
            document.querySelector('#buttonDel'+ member_id).addEventListener('click', () => {WalletManager.delMember(member_id,selectedWalletId)
            })
            document.querySelector('#buttonEdit'+ member_id).addEventListener('click', () => {
                WalletManager.putMember(member_id)
            })
        })
    }

    static async shareWallet(wallet_id){
        const share = document.getElementById('share').checked
        if (share == true){
            RequestPut.shareWallet(1, wallet_id)
        }else {
            RequestPut.shareWallet(0, wallet_id)
        }
    }

    static async delWallet(selectedWalletId,selectedWalletName){
        var opcion = confirm("¿Seguro que quieres Borrar el Wallet " + selectedWalletName +" y todas sus transacciones?");
        if (opcion == true) {
            RequestDel.delWallet(selectedWalletId)
            window.location.reload()
        } else {
        }
        console.log("delWallet")
    }

    static async addDescriptionWallet(wallet_id){
        const description = document.getElementById('description_wallet_edit').value
        RequestPut.addDescription(wallet_id,description)
        document.getElementById('description_wallet_edit').classList.add('changeInput')
    }

    static async putMember(member_id){
        const name_new = document.querySelector('#Member' + member_id).value
        const name_old = document.querySelector('#GroupMember' + member_id).dataset.memberNickname
        const respuesta = await RequestPut.putNickname(name_old,name_new)
        if (respuesta === true) {
            document.getElementById('Member'+ member_id).classList.add('changeInput')
        } else {
            document.getElementById('Member'+ member_id).classList.add('changeInputError')
        }
        document.getElementById('Member'+member_id).classList.add('changeInput')
        console.log("putMember")
    }

    static async editUser(){
        WalletManager.menuHideAll()
        document.querySelector('#edit-user-group').classList.remove("hidden")
        const member_id = document.querySelector("#name-proprietary").dataset.idProprietary
        const member_name = document.querySelector("#name-proprietary").dataset.nameProprietary
        const member_nickname = document.querySelector("#name-proprietary").dataset.nicknameProprietary
        document.querySelector('#nickname-name').value = member_nickname
        document.querySelector('#user-name').value = member_name
        document.querySelector('#buttonEditNickname').addEventListener('click', () => {WalletManager.putMember(member_id)
        })
        document.querySelector('#buttonDelUser').addEventListener('click', () => {WalletManager.delUser(member_id,member_name)
        })
        document.querySelector('#buttonEditUser').addEventListener('click', () => {WalletManager.putUser(member_name,member_id)
        })
        document.querySelector('#buttonEditPin').addEventListener('click', () => {WalletManager.putPin(member_id)
        })
        document.querySelector('#buttonEditUser-atras').addEventListener('click', () => {
            document.querySelector('#edit-user-group').classList.add("hidden")
            document.location.href= "start.html"
        })

    }

    static async delUser(user_id, user_name){
        const respuesta = await RequestDel.delUser(user_id)
        if (respuesta === true) {
            document.location.href= "index.html"
        } else {
            document.getElementById('user-name').classList.add('changeInputError')
            alert("El Miembro " + user_name +" no se puede eliminar porque pertenece a algún Wallet, primero debe saldar cuentas y salir del Wallet.");
        }
        console.log("delMember")
    }
    
    static async putUser(name_old,user_id){
        const pin_now = document.querySelector('#pin-now').value
        if (pin_now.length == 0){
            alert("Debe introducir el Pin de Sesión Actual para modificar el Nombre de Inicio de Sesión")
            document.getElementById('pin-now').classList.add('changeInputError')
        }else {
            const pin = await RequestGet.getPinId(user_id)
            if (pin[0]["pin"] == pin_now){
                const name_new = document.querySelector('#user-name').value
                const respuesta = await RequestPut.putUser(name_old,name_new)
                if (respuesta === true) {
                    alert("RECUERDE que en el próximo Inicio de Sesión su Usuario será " + name_new)
                    document.getElementById('user-name').classList.add('changeInput')
                } else {
                    document.getElementById('user-name').classList.add('changeInputError')
                    
                }
                document.getElementById('user-name').classList.add('changeInput')
                
            }else {
                alert("Pin de Sesión Actual INCORRECTO")
                document.getElementById('pin-now').classList.add('changeInputError')
            }
        }
        console.log("putUser")
    }

    static async putPin(user_id){
        const pin_now = document.querySelector('#pin-now').value
        const pin_new = document.querySelector('#pin-new').value
        document.getElementById('pin-now').classList.remove('changeInputError')
        document.getElementById('pin-new').classList.remove('changeInputError')
        if (pin_now.length == 0){
            alert("Debe introducir el Pin de Sesión Actual")
            document.getElementById('pin-now').classList.add('changeInputError')
            if (pin_new.length == 0){
                alert("Debe introducir el Pin de Sesión Nuevo")
                document.getElementById('pin-new').classList.add('changeInputError')
            }
        }else {
            const pin = await RequestGet.getPinId(user_id)
            if (pin[0]["pin"] == pin_now){
                const respuesta = await RequestPut.putPin(pin_now,pin_new,user_id)
                if (respuesta === true) {
                    alert("RECUERDE que en el próximo Inicio de Sesión su PIN será " + pin_new)
                    document.getElementById('pin-new').classList.add('changeInput')
                    document.getElementById('pin-now').classList.remove('changeInput')
                    document.getElementById('pin-new').value = ""
                    document.getElementById('pin-now').value = ""
                } else {
                    document.getElementById('pin-new').classList.add('changeInputError')
                }
                
            }else {
                alert("Pin de Sesión Actual INCORRECTO")
                document.getElementById('pin-now').classList.add('changeInputError')
            }
            document.getElementById('pin-new').classList.add('changeInput')
        }
        console.log("putPin")
    }


    static async addMemberWalet(wallet_id){
        const name_add = document.getElementById('newMemberWallet_new').value
        const members_list = document.querySelectorAll(".GroupMember").length
        await RequestPost.postMember(wallet_id,name_add)
        if (members_list == 0){
            await RequestPut.putProprietary(wallet_id,name_add)
        }
        document.getElementById('membersEdit-selector').innerHTML = ""
        WalletManager.editWalletMembers(wallet_id)
        console.log("addMemberWalet")
    }

    static async delMember(member_id,wallet_id){
        const member_name = document.querySelector('#Member' + member_id).value
        const respuesta = await RequestDel.delMember(wallet_id,member_id)
        if (respuesta === true) {
            document.getElementById('GroupMember' + member_id).classList.add('hidden')
            document.getElementById('membersEdit-selector').classList.remove('hidden')
        } else {
            document.getElementById('Member' + member_id).classList.add('changeInputError')
            alert("El Miembro " + member_name +" no se puede eliminar porque tiene pendiente saldar cuentas.");
        }
        console.log("delMember")
    }

    static async editWalletName(name_old){
        const name_new = document.getElementById('name_edit_new').value
        const respuesta = await RequestPut.putWallet(name_old,name_new)
        
        if (respuesta === true) {
            document.getElementById('name_edit_new').classList.add('changeInput')
        } else {
            document.getElementById('name_edit_new').classList.add('changeInputError')
        }
        document.getElementById('name_edit_new').classList.add('changeInput')
     console.log("editWalletName")   
    }

    static async addMember(){
        const name_add = document.getElementById('name_add').value
        const wallet = await RequestGet.getWalletToId(name_add)
        const wallet_id = wallet[0]["id"]
        const member_add = document.getElementById('new_add').value
        RequestPost.postMember(wallet_id,member_add)
        WalletManager.fillMembersSelector([member_add])
        document.getElementById('new_add').value = ""
        console.log("addMember")
        return member_add
    }

    fillMembersSelector(members) {
        const payersSelector = document.querySelector('#membersAdd-selector')
        const fragment = document.createDocumentFragment()
        members.forEach(members => {
            const option = document.createElement('option')
            option.value = members
            option.text = members
            fragment.appendChild(option)
        })
        payersSelector.append(fragment)
        document.getElementById('membersAdd-selector').classList.remove('hidden')
        console.log("fillMembersSelector")
        return payersSelector
    }

    static async checkInput(elemetById){
        const name_new = document.getElementById(elemetById).value
        document.getElementById(elemetById).classList.remove('changeInputError')
        if (name_new == "") {
            document.getElementById(elemetById).classList.add('changeInputError')
            document.getElementById('button-edit-save').disabled = true
            document.getElementById('button-save').disabled = true
        } else {
            document.getElementById(elemetById).classList.remove('changeInputError')
            document.getElementById('button-edit-save').disabled = false
            document.getElementById('button-save').disabled = false
        }

        console.log("checkInput")
    }



   static showTransac() {
        WalletManager.hiddenButtonEdit()
        WalletManager.exitTransaction()
        WalletManager.domElements.walletGroup.classList.add('hidden')
        WalletManager.domElements.divisionGroup.classList.add('hidden')
        WalletManager.domElements.addTransactionGroup.classList.add('hidden')
        WalletManager.domElements.editTransactionGroup.classList.add('hidden')
        WalletManager.domElements.transactionsGroup.classList.remove('hidden')
        console.log("showTransac")
    }
    
    static async saveAddTransac(selectedWalletId){
        this.hiddenButtonEdit()
        const resultado = await TransactionManager.addTransac(selectedWalletId)
        if (resultado===true){
        this.transactionsList(selectedWalletId)
        }
        console.log("saveAddTransac")
    }

    static async saveEditTransac(selectedWalletId){
        WalletManager.hiddenButtonEdit()
        const resultado = await TransactionManager.editTransac(selectedWalletId)
        if (resultado===true){
        WalletManager.transactionsList(selectedWalletId)
        //this.showTransac()
        }
        console.log("saveEditTransac")
    }

    static showAddTransac(selectedWalletId) {
        WalletManager.hiddenButtonEdit()
        document.getElementById('button-save').disabled = true
        WalletManager.domElements.walletGroup.classList.add('hidden')
        WalletManager.domElements.transactionsGroup.classList.add('hidden')
        WalletManager.domElements.addTransactionGroup.classList.remove('hidden')
        document.querySelector('#tituloAñadir').classList.remove('hidden')
        document.querySelector('#button-save').classList.remove('hidden')
        document.querySelector('#tituloEditar').classList.add('hidden')
        document.querySelector('#button-edit-save').classList.add('hidden')
        document.querySelector('#buttonDelTransac').classList.add('hidden')
        document.querySelector('#participants-selector').value = "Todos"
        document.getElementById("description_add").addEventListener("blur", () => {WalletManager.checkInput("description_add")})
        document.getElementById("amount_add").addEventListener("blur", () => {WalletManager.checkInput("amount_add")})
        document.getElementById("description_add").focus()
        document.querySelector("#adddate-selector").value = TransactionManager.dateTimeNow()
        TransactionManager.init(selectedWalletId)
        console.log("showAddTransac")
    }

    static showEditTransac(transac_id,selectedWalletId) {
        document.getElementById('button-edit-save').disabled = true
        document.querySelector('#wallets-group').classList.add('hidden')
        document.querySelector('#transactions-group').classList.add('hidden')
        document.querySelector('#add-transaction-group').classList.remove('hidden')
        document.querySelector('#edit-transaction-group').classList.add('hidden')
        document.querySelector('#division-group').classList.add('hidden')
        document.querySelector('#tituloAñadir').classList.add('hidden')
        document.querySelector('#button-save').classList.add('hidden')
        document.querySelector('#tituloEditar').classList.remove('hidden')
        document.querySelector('#button-edit-save').classList.remove('hidden')
        document.querySelector('#buttonDelTransac').classList.remove('hidden')
        document.getElementById('description_add').classList.remove('changeInputError')
        document.getElementById('amount_add').classList.remove('changeInputError')
        document.getElementById("description_add").addEventListener("blur", () => {WalletManager.checkInput("description_add")})
        document.getElementById("amount_add").addEventListener("blur", () => {WalletManager.checkInput("amount_add")})
        document.getElementById("description_add").focus()
        TransactionManager.initTransaction(transac_id,selectedWalletId)
        console.log("showEditTransac")
    }

    static async menuHideAll(){
        document.querySelector('#wallets-group').classList.add('hidden')
        document.querySelector('#transactions-group').classList.add('hidden')
        document.querySelector('#add-transaction-group').classList.add('hidden')
        document.querySelector('#add-wallet-group').classList.add('hidden')
        document.querySelector('#edit-wallet-group').classList.add('hidden')
        document.querySelector('#edit-transaction-group').classList.add('hidden')
        document.querySelector('#division-group').classList.add('hidden')
        document.querySelector('#tituloAñadir').classList.add('hidden')
        document.querySelector('#button-save').classList.add('hidden')
        document.querySelector('#tituloEditar').classList.add('hidden')
        document.querySelector('#button-edit-save').classList.add('hidden')
        document.querySelector('#buttonDelTransac').classList.add('hidden')
        document.getElementById("container").classList.remove('hidden')
        document.getElementById("aboutText").classList.add('hidden')
        document.getElementById("myLinks").style.display = "none"
        console.log("menuHideAll")
    }

    static async editCategoryShow(){
        WalletManager.menuHideAll()
        document.querySelector('#button-editCat-atras').addEventListener('click', () => {window.location.reload()})
        document.querySelector('#newCategory-save').addEventListener('click', () => {
            const category_new = document.querySelector('#newCategory').value
            TransactionManager.saveCategory(category_new)
            WalletManager.editCategoryShow()})

        TransactionManager.editCategory()
        console.log("showEditCategory")

    }

    static showDivision() {
        WalletManager.domElements.walletGroup.classList.add('hidden')
        WalletManager.domElements.transactionsGroup.classList.add('hidden')
        WalletManager.domElements.addTransactionGroup.classList.add('hidden')
        WalletManager.domElements.editTransactionGroup.classList.add('hidden')
        WalletManager.domElements.divisionGroup.classList.remove('hidden')
        console.log("showDivision")
    }

    showButtonEdit(){
        const transactions = document.querySelectorAll('.mini-button-hidden')
        const trans_length = transactions.length
        for ( let i = 0;i < trans_length ;i++) {
            var transactio = transactions[i]
                transactio.className="mini-button"
        }
        console.log("showButtonEdit")
    }

    static hiddenButtonEdit(){
        const transactions = document.querySelectorAll('.mini-button')
        const trans_length = transactions.length
        for ( let i = 0;i < trans_length ;i++) {
            var transactio = transactions[i]
                transactio.className="mini-button-hidden"
        }
        console.log("hiddenButtonEdit")
    }

    static exitTransaction(){
        document.getElementById('description_add').value="";
        document.getElementById('amount_add').value="";
        document.querySelector('#category-selected').value="";
        document.querySelector('#payers-selector').value="";
        console.log("exitTransaction")
    }


    static async acciondb(){
        var myFile = document.querySelector("#file").files[0]
        var form = new FormData()
        form.append("file", myFile)
        const response = RequestPost.postFile(form)
        const walletManager = new WalletManager()
        await walletManager.init()
        document.querySelector("#file").classList.add("hidden")
        
    }

    static async permanentUserRead(){
        let objet_load = localStorage.getItem("key")
        objet_load = JSON.parse(objet_load)
        const id_proprietary = objet_load["Id"]
        if (id_proprietary == undefined ){
            localStorage.clear()
            document.location.href= "index.html"
        }
        let name_proprietary = await RequestGet.getIdName(id_proprietary)
        if (name_proprietary.length == 0 ){
            localStorage.clear()
            document.location.href= "index.html"
        }
        name_proprietary = name_proprietary[0].name
        const nickname_id = await RequestGet.getIdName(id_proprietary)
        const nickname_proprietary = nickname_id[0]["nickname"]
        document.querySelector("#proprietary-wallets").innerHTML = `<div id="name-proprietary" data-name-proprietary='${name_proprietary}' data-id-proprietary='${id_proprietary}' data-nickname-proprietary='${nickname_proprietary}'>Wallets de ${name_proprietary}</div><div>Alias ${nickname_proprietary}</div>`
        console.log("permanentUserRead")
        
    }
}
