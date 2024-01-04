///import { UrlPath } from './UrlPath.js'
//import { WalletManager } from './WalletManager.js'
//import { RequestDel } from './RequestDel.js'
import { RequestGet } from './RequestGet.js'
import { RequestPost } from './RequestPost.js'
//import { RequestPut } from './RequestPut.js'

export class UserManager {

    constructor() {
        this.initialiting()
    }
    
    static async init() {
        return new UserManager()
    }
    
    initialiting(){
        UserManager.permanentUserRead()
       document.querySelector('#button-add-username').addEventListener('click', () => {this.addUserNew()
       })
    }

    async addUserNew(){
        const name_add = document.getElementById('name-username').value
        const pin_add = document.getElementById('pin-username').value
        const respuesta = await RequestPost.postUser(name_add, pin_add)
        console.log (respuesta)
        if (respuesta === false) {
            document.getElementById('name-username').classList.add('changeInputError')
        } else {
            UserManager.permanentUserSave()
        }
    }

    static async permanentUserSave(){
        const name_add = document.getElementById('name-username').value
        const pin_add = document.getElementById('pin-username').value
        let user_id = await RequestGet.getUserId(name_add)
        user_id = user_id[0].id
        let objet = {
            Id : user_id,
            Pin : pin_add,
        };
        objet = JSON.stringify(objet);
        localStorage.setItem("key", objet);
        document.location.href= "start.html"
    }

    static async permanentUserRead(){
        let objet_load = localStorage.getItem("key")
        objet_load = JSON.parse(objet_load)
        if (localStorage.length == 0){
            document.querySelector("#container").classList.remove("hidden")
        }
        else {
            document.location.href= "start.html"
        }
    }

    deleteSesion(){
        localStorage.clear()
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
}
