import { UrlPath } from './UrlPath.js'

export class RequestPost {

    //POST
    static async postTransaction(transaction) {
        const url = UrlPath.URL.TRANSACTIONE
        //console.log(transaction)
        const transaction_add =  {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPost._postRequest(url, transaction_add)
    }

    static async postCategory(new_category) {
        
        const url = UrlPath.URL.CATEGORIES + new_category
        const category_add =  {
            method: 'POST',
            body: JSON.stringify({new_category}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPost._postRequest(url, category_add)
    }

    static async postUser( new_user, pin) {
        
        const url = UrlPath.URL.USER + new_user +"/"+ pin
        const user_add =  {
            method: 'POST',
            body: JSON.stringify(new_user, pin),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPost._postRequest(url, user_add)
    }

    static async postMember(wallet_id,member_name,pin) {
        const url = UrlPath.URL.WALLET + wallet_id + "/member/" + member_name + "/" + pin
        const member_add =  {
            method: 'POST',
            body: JSON.stringify({wallet_id,member_name}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPost._postRequest(url, member_add)
    }

    static async postWallet(wallet_name,proprietary) {
        
        const url = UrlPath.URL.WALLET + wallet_name + "/" + proprietary
        const wallet_add =  {
            method: 'POST',
            body: JSON.stringify({wallet_name, proprietary}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPost._postRequest(url, wallet_add)
    }

    static async postFile(file) {
        const url = UrlPath.URL.FILE
        let response = {
            method: 'POST',
            body: file
        }
        return await RequestPost._postRequest(url, response)
    }

    //REQUEST

    static async _postRequest(url, data) {
        try {
            const response = await fetch(url, data)
            const jsonMessage = await response.json()
            return jsonMessage
        } catch (error) {
            console.log(error)
            return null
        }
       
    }
}